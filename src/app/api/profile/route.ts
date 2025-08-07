import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

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

        const user = await User.findOne({ email: payload.email }).lean();

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        return NextResponse.json(user);
    } catch (err) {
        console.error('JWT error:', err);
        return new Response('Invalid Token', { status: 403 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();

        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { payload } = await jwtVerify(token, secret) as { payload: Payload };

        const body = await request.json();

        const user = await User.findOne({ email: payload.email });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        user.name = body.name || user.name;
        user.email = body.email || user.email;
        user.phone = body.phone || user.phone;
        user.gender = body.gender || user.gender || '';
        user.dob = body.dob || user.dob || '';
        user.location = body.location || user.location || '';
        user.skills = body.skills || user.skills || [];
        user.education = body.education || user.education || [];
        user.image = body.photoUrl || user.image || '';

        await user.save();

        return NextResponse.json(user);
    } catch (err) {
        console.error('Error saving profile:', err);
        return new Response('Failed to save profile', { status: 500 });
    }
}
