import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'e7QTfpRylS3XERRdFRnZ7s0zrO79GDsfm4BHkL/Vv1o=');

interface Payload {
    name: string;
    email: string;
    phone?: string;
}

export async function GET() {
    try {
        // ✅ cookies() is synchronous — DO NOT await
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { payload } = await jwtVerify(token, secret) as { payload: Payload };

        return NextResponse.json({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        });
    } catch (err) {
        console.error('JWT error:', err);
        return new Response('Invalid Token', { status: 403 });
    }
}
