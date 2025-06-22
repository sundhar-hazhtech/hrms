'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0fdfc]">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#34b6b8]">Welcome to  HRMS</h1>
        <p className="text-gray-600">Efficient HR management made easy.</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-[#34b6b8] text-white px-6 py-2 rounded-full font-medium hover:bg-[#2aa8a9]"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="border border-[#34b6b8] text-[#34b6b8] px-6 py-2 rounded-full font-medium hover:bg-[#e6fcfb]"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}
