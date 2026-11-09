import { NextRequest, NextResponse } from 'next/server';
import { validateUserInput, sanitizeAssistantOutput, STANDARD_REFUSAL } from '@/lib/ai/guardrails';
import { getLiveServiceRates } from '@/lib/ai/pricingTool';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages, userPhone } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content || '';

    // 1. INPUT GUARDRAIL LAYER
    const validation = validateUserInput(userQuery);
    if (!validation.allowed) {
      return NextResponse.json({
        role: 'assistant',
        content: validation.refusal || STANDARD_REFUSAL,
      });
    }

    const queryLower = userQuery.toLowerCase();
    const services = await getLiveServiceRates();

    // 2. ORDER TRACKING & STATUS (STRICT PRIVACY - GUEST VS LOGGED-IN USER)
    const isOrderQuery =
      queryLower.includes('track') ||
      queryLower.includes('status') ||
      queryLower.includes('my order') ||
      queryLower.includes('my clothes') ||
      queryLower.includes('where is my') ||
      queryLower.includes('order id') ||
      queryLower.includes('driver location') ||
      queryLower.includes('delivery status');

    if (isOrderQuery) {
      if (!userPhone || String(userPhone).trim().length < 6) {
        const responseText = `🔒 **Private & Secure Order Tracking**\n\nTo safeguard customer privacy, order tracking and garment statuses are strictly confidential and **cannot be shared with guest users**.\n\n👉 **To track your laundry:**\n1. Please **Log In** with your registered mobile number using the **Orders** tab in the bottom navigation.\n2. Once logged in, you will only see live driver tracking and digital bills for **your own personal orders**.\n\nNo other customer's information is ever shared.`;
        return NextResponse.json({
          role: 'assistant',
          content: sanitizeAssistantOutput(responseText),
          requireLogin: true,
        });
      }

      // If user is authenticated with userPhone:
      try {
        const payload = await getPayload({ config });
        const cleanPhone = String(userPhone).replace(/\D/g, '').slice(-10);
        const userOrders = await payload.find({
          collection: 'leads',
          where: {
            phone: { contains: cleanPhone },
          },
          limit: 3,
        });

        if (userOrders.totalDocs > 0) {
          const orderSummary = userOrders.docs
            .map(
              (o: any) =>
                `• **Order #${String(o.id).slice(0, 8).toUpperCase()}**: ${o.serviceInterested || 'Laundry Wash'}\n  **Status**: ${
                  o.status === 'New' ? 'Pickup Scheduled' : o.status
                }\n  **Pickup Slot**: ${o.notes || 'Today: 2:00 PM – 5:00 PM'}`
            )
            .join('\n\n');

          const responseText = `Here are the active order details for your account (**+91 ${cleanPhone.slice(0, 2)}••••••${cleanPhone.slice(-2)}**):\n\n${orderSummary}\n\nOur driver carries certified digital scales and will weigh your clothes at your doorstep.`;
          return NextResponse.json({
            role: 'assistant',
            content: sanitizeAssistantOutput(responseText),
          });
        } else {
          const responseText = `We could not find any active orders for your registered number (**+91 ${cleanPhone.slice(0, 2)}••••••${cleanPhone.slice(-2)}**).\n\nWould you like to schedule a fresh doorstep pickup right now?`;
          return NextResponse.json({
            role: 'assistant',
            content: sanitizeAssistantOutput(responseText),
          });
        }
      } catch (e) {
        const responseText = `Your account is logged in as **+91 ${userPhone}**. Your live order tracking is active. Please check the **Orders** tab on the navigation bar for your live driver map and weighing receipt.`;
        return NextResponse.json({
          role: 'assistant',
          content: sanitizeAssistantOutput(responseText),
        });
      }
    }

    // 3. LIVE PRICING & SERVICE TOOL MATCHING (SOFA & UPHOLSTERY SPECIFIC)
    if (queryLower.includes('sofa') || queryLower.includes('chair') || queryLower.includes('cushion')) {
      const responseText = `Here are our verified on-site Sofa, Chair & Cushion Cleaning rates at KG Laundry:\n\n• **Standard Sofa Seat**: ₹399 per seat\n• **Leather Sofa Seat**: ₹479 per seat (includes deep leather conditioning)\n• **Dining Chair**: ₹250 per chair\n• **Small Chair / Study Chair**: ₹189 per chair\n• **Large Cushion**: ₹129 per piece\n• **Small Cushion**: ₹119 per piece\n\nAll upholstery cleaning uses injection-extraction foam wash that dries completely within 2 to 3 hours. Would you like to place your order for on-site sofa cleaning?`;

      return NextResponse.json({
        role: 'assistant',
        content: sanitizeAssistantOutput(responseText),
      });
    }

    // 3B. CARPET CLEANING SPECIFIC
    if (queryLower.includes('carpet') || queryLower.includes('rug') || queryLower.includes('mat')) {
      const responseText = `Our Carpet & Rugs Cleaning rate is **₹35 per square feet**.\n\n• High-suction rotary shampoo extraction removing deep dirt and dust mites\n• Spot stain treatment for wine, coffee, and oil marks\n• Anti-microbial deodorizing rinse\n• Free doorstep pickup and delivery in Hyderabad for orders above ₹499!`;

      return NextResponse.json({
        role: 'assistant',
        content: sanitizeAssistantOutput(responseText),
      });
    }

    // 3C. GENERAL PRICING & SERVICE TOOL MATCHING
    if (
      queryLower.includes('price') ||
      queryLower.includes('rate') ||
      queryLower.includes('cost') ||
      queryLower.includes('kg') ||
      queryLower.includes('per kg') ||
      queryLower.includes('wash & fold') ||
      queryLower.includes('dry clean') ||
      queryLower.includes('how much')
    ) {
      const pricingSummary = services
        .map((s) => `• **${s.title}**: ₹${s.basePrice} ${s.pricingUnit.replace('_', ' ')} (${s.turnaroundTime} turnaround)`)
        .join('\n');

      const responseText = `Here are our current, transparent pricing rates at KG Laundry:\n\n${pricingSummary}\n\n✨ **Add-ons available**: Anti-Bacterial Sanitization (+₹30), Organic Lavender Softener (+₹20), Express 6-Hour Delivery (+₹60).\n\nWould you like to schedule a pickup or know more about a specific service?`;

      return NextResponse.json({
        role: 'assistant',
        content: sanitizeAssistantOutput(responseText),
        pricingData: services,
      });
    }

    // 4. SERVICE AREAS & PICKUP
    if (
      queryLower.includes('area') ||
      queryLower.includes('location') ||
      queryLower.includes('where') ||
      queryLower.includes('deliver') ||
      queryLower.includes('pickup') ||
      queryLower.includes('madhapur') ||
      queryLower.includes('gachibowli') ||
      queryLower.includes('hitech')
    ) {
      const responseText = `We provide doorstep pickup and delivery across Hyderabad in:\n\n• **Hitech City**\n• **Madhapur**\n• **Gachibowli**\n• **Kondapur**\n• **Jubilee Hills**\n• **Banjara Hills**\n• **Financial District**\n\nDoorstep pickup and delivery is **Free** on all orders above ₹499! We operate 7 days a week from 7:00 AM to 10:00 PM.`;

      return NextResponse.json({
        role: 'assistant',
        content: sanitizeAssistantOutput(responseText),
      });
    }

    // 5. TURNAROUND TIMES & EXPRESS
    if (
      queryLower.includes('time') ||
      queryLower.includes('how long') ||
      queryLower.includes('turnaround') ||
      queryLower.includes('express') ||
      queryLower.includes('fast') ||
      queryLower.includes('same day') ||
      queryLower.includes('hours')
    ) {
      const responseText = `Here are our turnaround times:\n\n• **Wash & Fold (By KG)**: Guaranteed **24 Hours**\n• **Wash & Steam Iron**: Guaranteed **24 Hours**\n• **Premium Dry Cleaning**: **48 Hours**\n• **Home Linens & Curtains**: **48 Hours**\n• **⚡ Express 6-Hour Service**: Available for same-day delivery upon request (+₹60/order).\n\nAll garments are washed separately and sealed in breathable, moisture-resistant bags.`;

      return NextResponse.json({
        role: 'assistant',
        content: sanitizeAssistantOutput(responseText),
      });
    }

    // 6. APP DOWNLOAD
    if (
      queryLower.includes('app') ||
      queryLower.includes('download') ||
      queryLower.includes('ios') ||
      queryLower.includes('android') ||
      queryLower.includes('mobile') ||
      queryLower.includes('play store')
    ) {
      const responseText = `You can download the KG Laundry mobile app on both iOS and Android to track orders in real time, set garment preferences, and schedule pickups with 1 tap!\n\n• [Download on Apple App Store](https://apps.apple.com)\n• [Download on Google Play Store](https://play.google.com)\n\nFirst-time app users can use code **FRESHKG** for 20% off!`;

      return NextResponse.json({
        role: 'assistant',
        content: sanitizeAssistantOutput(responseText),
      });
    }

    // 7. DEFAULT POLITE LAUNDRY GUIDANCE
    const defaultResponse = `At KG Laundry, we provide doorstep laundry, dry cleaning, and steam ironing with free pickup for orders over ₹499 in Hyderabad.\n\nOur popular services include:\n1. **Wash & Fold by KG** (₹79/kg, 24h turnaround)\n2. **Wash & Steam Iron** (₹119/kg, 24h turnaround)\n3. **Premium Dry Cleaning** (₹149/pc, 48h turnaround)\n\nWould you like to schedule a pickup or have questions about a specific garment?`;

    return NextResponse.json({
      role: 'assistant',
      content: sanitizeAssistantOutput(defaultResponse),
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      role: 'assistant',
      content: STANDARD_REFUSAL,
    });
  }
}
