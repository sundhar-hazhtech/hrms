import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    await connectDB();

    const { email, password }: { email: string; password: string } = await req.json();
    const jwtSecret = process.env.JWT_SECRET || 'e7QTfpRylS3XERRdFRnZ7s0zrO79GDsfm4BHkL/Vv1o=';

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return new Response('Invalid email or password', { status: 401 });
    }

    const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, phone: user.phone },
        jwtSecret,
        { expiresIn: '7d' }
    );

    const res = NextResponse.json({ message: 'Login successful' });
    res.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
}
