'use client';
import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

interface UserInfoCardProps {
  name: string;
  email: string;
}

export default function UserInfoCard({ name, email }: UserInfoCardProps) {
  return (
    <div className="flex items-center space-x-3 bg-white rounded-lg shadow w-55 ml-auto">
      <UserCircleIcon className="w-10 h-10 text-purple-600" />
      <div className="text-sm truncate">
        <p className="text-purple-600 font-semibold truncate">
          Hello, {name || 'Loading...'}
        </p>
        <p className="text-gray-600 text-xs truncate">
          {email || ''}
        </p>
      </div>
    </div>
  );
}
