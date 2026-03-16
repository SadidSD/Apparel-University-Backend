"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ArrowLeft, CheckCircle2, LogIn, ShieldCheck, Clock } from 'lucide-react';

export default function SignOutPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isClearing, setIsClearing] = useState(true);

  useEffect(() => {
    // Simulate complex sign out tasks
    const clearSession = async () => {
      // Clear localStorage
      const theme = localStorage.getItem('theme'); // Keep theme preference
      localStorage.clear();
      if (theme) localStorage.setItem('theme', theme);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsClearing(false);
    };

    clearSession();

    const timer = setInterval(() => {
      if (!isClearing) {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [router, isClearing]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-[2.5rem] p-10 shadow-2xl border border-border text-center relative overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* Background glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#2D9CDB]/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#2D9CDB]/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-blue-50 dark:bg-[#2D9CDB]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#2D9CDB] rotate-3 shadow-inner">
            <LogOut size={48} className="-translate-x-1" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-card-foreground mb-4 tracking-tight">Success!</h1>
          <p className="text-gray-500 dark:text-zinc-400 mb-10 leading-relaxed">
            You have been safely signed out. We're redirecting you back to the dashboard.
          </p>

          <div className="bg-background/50 border border-border rounded-3xl p-6 mb-8 space-y-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3 text-gray-500 dark:text-zinc-400">
                <Clock size={18} className="text-[#2D9CDB]" />
                <span>Redirecting in</span>
              </div>
              <span className="font-black text-2xl text-[#2D9CDB]">{countdown}s</span>
            </div>
            
            <div className="w-full bg-gray-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#2D9CDB] h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(countdown / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => router.push('/')}
              className="w-full bg-[#2D9CDB] text-white py-4.5 rounded-2xl font-bold hover:bg-[#2582b8] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100 dark:shadow-none active:scale-[0.98] py-4"
            >
              <ArrowLeft size={20} />
              Return to Dashboard
            </button>
            
            <button 
              onClick={() => router.push('/')} // Simulation: Redirect to home (which would normally lead to login if unauth)
              className="w-full bg-background border border-border text-card-foreground py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <LogIn size={20} className="text-[#2D9CDB]" />
              Sign In Again
            </button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2.5 text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
            <ShieldCheck size={14} className="text-green-500" />
            Session Cleared Securely
          </div>
        </div>
      </div>
    </div>
  );
}
