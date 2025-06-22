import './globals.css';
import { AuthProvider } from './context/AuthContext';
import React, { ReactNode } from 'react';

export const metadata = {
  title: 'Login Demo',
  description: 'Login Signup Flow',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
