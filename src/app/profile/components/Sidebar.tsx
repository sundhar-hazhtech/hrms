'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className="md:hidden purple-600 text-white flex justify-end items-center p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          className="p-2 rounded bg-purple-700 z-50"
        >
          {sidebarOpen ? (
            <CloseOutlined className="text-white text-lg" />
          ) : (
            <MenuOutlined className="text-white text-lg" />
          )}
        </button>
      </div>

      <aside
        className={`fixed md:fixed top-0 left-0 w-64 h-screen bg-purple-700 text-white flex flex-col p-6 space-y-6 md:flex transition-transform transform z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h2 className="text-2xl font-bold hidden md:block">HRMS</h2>
        <nav className="flex flex-col space-y-4 pb-6">
          <Link 
            href="/profile/dashboard" 
            onClick={handleLinkClick}
            className={`p-2 rounded transition ${
              isActive('/profile/dashboard') 
                ? 'bg-white text-purple-600 font-semibold' 
                : 'hover:bg-white hover:text-purple-600'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            href="#Projects" 
            onClick={handleLinkClick}
            className={`p-2 rounded transition ${
              isActive('#Projects') 
                ? 'bg-white text-purple-600 font-semibold' 
                : 'hover:bg-white hover:text-purple-600'
            }`}
          >
            Projects
          </Link>
          <Link 
            href="#PayRoll" 
            onClick={handleLinkClick}
            className={`p-2 rounded transition ${
              isActive('#PayRoll') 
                ? 'bg-white text-purple-600 font-semibold' 
                : 'hover:bg-white hover:text-purple-600'
            }`}
          >
            PayRoll
          </Link>
          <Link 
            href="#Attendance" 
            onClick={handleLinkClick}
            className={`p-2 rounded transition ${
              isActive('#Attendance') 
                ? 'bg-white text-purple-600 font-semibold' 
                : 'hover:bg-white hover:text-purple-600'
            }`}
          >
            Attendance
          </Link>
          <Link 
            href="/profile/my-profile" 
            onClick={handleLinkClick}
            className={`p-2 rounded transition ${
              isActive('/profile/my-profile') 
                ? 'bg-white text-purple-600 font-semibold' 
                : 'hover:bg-white hover:text-purple-600'
            }`}
          >
            My Profile
          </Link>
        </nav>
        <button
          onClick={async () => {
            await fetch('/api/logout', { credentials: 'include' });
            window.location.href = '/login';
          }}
          className="mt-auto bg-white text-purple-700 font-semibold py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-[1px] z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
