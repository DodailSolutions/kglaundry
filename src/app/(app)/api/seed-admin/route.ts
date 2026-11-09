import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

export async function GET() {
  try {
    const payload = await getPayload({ config });

    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: 'admin@kglaundry.in' },
      },
    });

    if (existing.totalDocs > 0) {
      return NextResponse.json({
        success: true,
        message: 'Admin account already exists and is ready for login.',
        loginUrl: 'http://localhost:3000/admin',
        credentials: {
          email: 'admin@kglaundry.in',
          password: 'Password123!',
          role: 'admin',
        },
      });
    }

    const created = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@kglaundry.in',
        password: 'Password123!',
        name: 'Syed Admin',
        role: 'admin',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully!',
      loginUrl: 'http://localhost:3000/admin',
      credentials: {
        email: 'admin@kglaundry.in',
        password: 'Password123!',
        role: 'admin',
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to initialize admin user',
    }, { status: 500 });
  }
}
