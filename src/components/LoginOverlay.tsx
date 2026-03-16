"use client";

import React, { useState } from 'react';
import { Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface LoginOverlayProps {
  onLoginSuccess: () => void;
}

export default function LoginOverlay({ onLoginSuccess }: LoginOverlayProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess();
      }, 800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/20 dark:bg-black/20 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-[400px] animate-in zoom-in-95 duration-500">
        
        {/* Branding above the box */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#1E293B] dark:text-white tracking-tight drop-shadow-sm">
                Apparel <span className="text-[#0866FF]">University</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mt-2">
                Bangladesh Admin Portal
            </p>
        </div>

        {/* The White Login Box (Facebook Size) */}
        <div className="bg-white dark:bg-card rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.1)] p-5 flex flex-col gap-4 border border-border/50">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-4 shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-xl font-bold text-title">Authenticating...</h2>
              <div className="mt-6 flex gap-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#0866FF] animate-bounce"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#0866FF] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-[#0866FF] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3.5 text-base border border-[#dddfe2] dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg focus:outline-none focus:border-[#0866FF] focus:shadow-[0_0_0_2px_#e7f3ff] dark:focus:shadow-none placeholder:text-gray-500 transition-all font-normal text-[#1c1e21] dark:text-zinc-200"
                />
              </div>

              <div className="flex flex-col relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3.5 text-base border border-[#dddfe2] dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg focus:outline-none focus:border-[#0866FF] focus:shadow-[0_0_0_2px_#e7f3ff] dark:focus:shadow-none placeholder:text-gray-500 transition-all font-normal text-[#1c1e21] dark:text-zinc-200"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#0866FF] text-white py-3 rounded-lg font-bold text-xl hover:bg-[#055be3] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1 shadow-md shadow-blue-500/10"
              >
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Log In"}
              </button>

              <div className="text-center">
                <button type="button" className="text-[#0866FF] text-sm font-medium hover:underline px-2">Forgotten password?</button>
              </div>

              <div className="border-b border-[#dddfe2] dark:border-zinc-800 my-1"></div>

              <div className="text-center pt-2">
                <p className="text-[12px] text-gray-400 font-medium">© 2026 Apparel University. All Rights Reserved.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
