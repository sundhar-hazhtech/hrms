import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    response.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0), // Expire immediately
    });

    return response;
}
