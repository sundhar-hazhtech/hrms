'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) return alert('Please enter credentials');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include' // include cookies from server (for token)
        });

        if (res.ok) {
            router.push('/profile');
        } else {
            alert(await res.text());
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-96 shadow-lg p-10 rounded-xl text-center">
                <h1 className="text-2xl font-bold text-[#34b6b8] mb-4">Login</h1>

                <div className="flex justify-center gap-4 mb-4">
                    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <img src="https://img.icons8.com/ios-filled/24/000000/facebook.png" alt="Facebook" />
                    </button>
                    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <img src="https://img.icons8.com/ios-filled/24/000000/google-logo.png" alt="Google" />
                    </button>
                    <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                        <img src="https://img.icons8.com/ios-filled/24/000000/linkedin.png" alt="LinkedIn" />
                    </button>
                </div>

                <p className="text-gray-500 text-sm mb-4">or use your email account:</p>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-[#34b6b8]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 bg-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-[#34b6b8]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                     <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
                        Forgot your password?
                        </div>
                     <div className="text-center text-sm text-gray-500">
                        Don’t have an account ? {''}                       
                        <Link href="/signup" className="text-[#34b6b8] font-medium hover:underline">
                            Create New
                        </Link>
                     </div>
                    <button
                        type="submit"
                        className="w-full bg-[#34b6b8] text-white py-2 rounded-full font-semibold hover:bg-[#2aa8a9] transition"
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
}
