'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/profile/components/Sidebar';
import UserInfoCard from '../components/UserInfoCard';
import ProfileDetails from '@/app/profile/components/ProfileDetails';
import DashboardStats from '@/app/profile/components/DashboardStats';
import LoadingOverlay from '@/app/components/LoadingOverlay';




export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [stats, setStats] = useState({
    employees: 0,
    leaveRequests: 0,
    notifications: 0,
  });

  // User info for UserInfoCard
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // TODO: Fetch real dashboard stats from API
    // For now, use placeholder data
    setStats({
      employees: 256,
      leaveRequests: 15,
      notifications: 10,
    });
  }, []);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) {
          console.error('Failed to fetch user profile');
          return;
        }
        const data = await res.json();
        const currentUser = data.user;

        if (currentUser) {
          // Since this endpoint returns only name and email, education, skills, location are not available here
          setName(currentUser.name || '');
          setEmail(currentUser.email || '');
          // You may want to fetch additional profile details from another endpoint if needed
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

   if (loading) return <LoadingOverlay loading={loading} message="Loading profile..." />

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main
        className={`flex-1 p-6 sm:p-10 md:ml-64 transition-all duration-300`}
      >
         <img src="/assets/Hashtag-Logo.png" alt="Logo" className="mb-2 w-65 h-12" />
        <UserInfoCard name={name} email={email} />
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Dashboard</h1>

        <DashboardStats
          employees={stats.employees}
          leaveRequests={stats.leaveRequests}
          notifications={stats.notifications}
        />

        <ProfileDetails
          location=""
          dob=""
          phone=""
          email=""
          gender=""
          onSave={() => {}}
          onChange={() => {}}
        />
      </main>
    </div>
  )
}

