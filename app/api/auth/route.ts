import { NextRequest, NextResponse } from 'next/server';
import { createToken, COOKIE_NAME, ADMIN_PASSCODE } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode) {
      return NextResponse.json(
        { error: 'Passcode is required' },
        { status: 400 }
      );
    }

    if (passcode !== ADMIN_PASSCODE) {
      return NextResponse.json(
        { error: 'Invalid passcode. Please try again.' },
        { status: 401 }
      );
    }

    const token = await createToken({ role: 'admin', authTime: Date.now() });

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      redirect: '/admin',
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.delete(COOKIE_NAME);
  return response;
}
