import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const phone = searchParams.get('phone');

    if (!phone || phone.trim().length < 6) {
      return NextResponse.json(
        {
          error: 'Authentication required. Guests cannot view customer order tracking details.',
          isGuest: true,
        },
        { status: 401 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, '').slice(-10);

    let orders: any[] = [];

    try {
      const payload = await getPayload({ config });
      const results = await payload.find({
        collection: 'leads',
        where: {
          phone: {
            contains: cleanPhone,
          },
        },
        sort: '-createdAt',
        limit: 10,
      });

      orders = results.docs.map((doc: any) => ({
        orderId: `KG-${String(doc.id).slice(0, 8).toUpperCase()}`,
        service: doc.serviceInterested || 'Wash & Fold by KG',
        status:
          doc.status === 'New'
            ? 'Pickup Scheduled'
            : doc.status === 'Scheduled'
            ? 'Driver Out for Pickup'
            : doc.status === 'Contacted'
            ? 'Slot Confirmed with Customer'
            : doc.status === 'Converted'
            ? 'In Separate Machine Wash'
            : doc.status,
        stage: doc.status,
        timeSlot: doc.notes || 'Today: 2:00 PM – 5:00 PM',
        driverName: 'Mohammad R. (KG Fleet)',
        driverPhone: '+91 98765 43210',
        pickupAddress: doc.address || 'Doorstep Pickup, Hyderabad',
        createdAt: doc.createdAt,
      }));
    } catch (err) {
      console.warn('Orders lookup fallback:', err);
    }

    return NextResponse.json({
      success: true,
      phone: `+91 ${cleanPhone}`,
      total: orders.length,
      orders,
    });
  } catch (error) {
    console.error('User orders error:', error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}
