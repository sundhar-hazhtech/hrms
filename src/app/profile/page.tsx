'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/profile', { credentials: 'include' });
            if (res.ok) {
                const data: User = await res.json();
                setUser(data);
            } else {
                router.push('/login');
            }
        }
        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/logout', { credentials: 'include' });
        router.push('/login');
    };

    if (!user) return <p className="p-10 text-center">Loading profile...</p>;

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
            <div className="md:hidden bg-[#34b6b8] text-white flex justify-between items-center p-4">
                <h2 className="text-xl font-bold">HRMS</h2>
                <button onClick={() => setShowSidebar(!showSidebar)}>
                    <img src="https://img.icons8.com/ios-filled/30/ffffff/menu--v1.png" alt="Menu" />
                </button>
            </div>

            <aside className={`bg-[#34b6b8] text-white w-full md:w-64 p-6 space-y-6 ${showSidebar ? 'block' : 'hidden'} md:block`}>
                <h2 className="text-2xl font-bold hidden md:block">HRMS</h2>
                <nav className="flex flex-col gap-4">
                    <a href="#dashboard" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded transition">Dashboard</a>
                    <a href="#employees" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded transition">Employees</a>
                    <a href="#leaves" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded transition">Leave Requests</a>
                    <a href="#settings" className="hover:bg-white hover:text-[#34b6b8] p-2 rounded transition">Settings</a>
                </nav>
                <div className="pt-6">
                    <button onClick={handleLogout} className="w-full bg-white text-[#34b6b8] font-semibold py-2 px-4 rounded hover:bg-gray-100 transition">
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-6 sm:p-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-[#34b6b8]">Dashboard</h1>

                    <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow">
                        <img src="https://img.icons8.com/ios-filled/40/34b6b8/user-male-circle.png" className="w-10 h-10 rounded-full" alt="User" />
                        <div className="text-sm">
                            <p className="text-[#34b6b8] font-semibold">{user.name}</p>
                            <p className="text-gray-600 text-xs">{user.email}</p>
                        </div>
                    </div>
                </div>

                <section id="dashboard" className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-500">Employees</p>
                            <p className="text-2xl font-bold text-[#34b6b8]">25</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-500">Leave Requests</p>
                            <p className="text-2xl font-bold text-[#34b6b8]">5</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 text-center">
                            <p className="text-gray-500">Notifications</p>
                            <p className="text-2xl font-bold text-[#34b6b8]">3</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
