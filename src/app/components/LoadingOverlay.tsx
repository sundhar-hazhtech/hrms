'use client';
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingOverlayProps {
  loading: boolean;
  message?: string;
}

export default function LoadingOverlay({ loading, message = 'Loading...' }: LoadingOverlayProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 backdrop-blur  flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center">
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24, color: '#7c3aed' }} spin />}
          size="large"
        />
        <p className="mt-3 text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}
