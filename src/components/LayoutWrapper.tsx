"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import LoginOverlay from '@/components/LoginOverlay';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <>
      {!isLoggedIn && <LoginOverlay onLoginSuccess={() => setIsLoggedIn(true)} />}
      
      <div className={`flex min-h-screen transition-all duration-1000 ease-out ${!isLoggedIn ? 'blur-[20px] scale-[0.98] pointer-events-none' : 'blur-0 scale-100'}`}>
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          {children}
        </div>
      </div>
    </>
  );
}
