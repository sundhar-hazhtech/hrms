import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest): Promise<Response> {
    try {
        await connectDB();
        const { name, phone, email, password }: { name: string; phone: string; email: string; password: string } = await request.json();

        if (!name || !phone || !email || !password) {
            return new Response('All fields are required', { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response('User already exists', { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response('User registered successfully', { status: 201 });
    } catch (err) {
        console.error('Register error:', err);
        return new Response('Internal Server Error', { status: 500 });
    }
}
