'use client';
import React from 'react';
import { UserGroupIcon, CalendarDaysIcon, BellIcon } from '@heroicons/react/24/outline';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center flex flex-col items-center transition hover:scale-[1.02] duration-200">
      {icon && <div className="mb-2 text-purple-600 dark:text-purple-400">{icon}</div>}
      <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">{value}</p>
    </div>
  );
}

interface DashboardStatsProps {
  employees: number;
  leaveRequests: number;
  notifications: number;
}

export default function DashboardStats({
  employees,
  leaveRequests,
  notifications,
}: DashboardStatsProps) {
  return (
    <section id="dashboard" className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          label="Employees"
          value={employees}
          icon={<UserGroupIcon className="w-8 h-8" />}
        />
        <StatCard
          label="Leave Requests"
          value={leaveRequests}
          icon={<CalendarDaysIcon className="w-8 h-8" />}
        />
        <StatCard
          label="Notifications"
          value={notifications}
          icon={<BellIcon className="w-8 h-8" />}
        />
      </div>
    </section>
  );
}
