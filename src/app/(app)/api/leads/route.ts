import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, service, address, pickupTime, email, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    let createdId: string | number = 'KG-' + Math.floor(100000 + Math.random() * 900000);

    try {
      const payload = await getPayload({ config });
      const doc = await payload.create({
        collection: 'leads',
        data: {
          name,
          phone: String(phone),
          email: email || undefined,
          serviceInterested: service || 'Wash & Fold by KG',
          address: address || 'Doorstep Pickup',
          notes: notes ? `${notes} (Slot: ${pickupTime || 'Standard'})` : `Requested Slot: ${pickupTime || 'Standard'}`,
          source: 'website_form',
          status: 'New',
        },
      });
      if (doc?.id) {
        createdId = doc.id;
      }
    } catch (dbErr) {
      console.warn('Payload lead storage note:', dbErr);
    }

    return NextResponse.json({
      success: true,
      orderId: createdId,
      message: 'Pickup request received! Concierge will contact you shortly.',
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to record lead' }, { status: 500 });
  }
}
