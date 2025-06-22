import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const jwtkey = "e7QTfpRylS3XERRdFRnZ7s0zrO79GDsfm4BHkL/Vv1o=";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || jwtkey);

export async function middleware(req: NextRequest): Promise<NextResponse> {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.redirect(new URL('/login', req.url));

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/profile'], // Add protected routes here
};
