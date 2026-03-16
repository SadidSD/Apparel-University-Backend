"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { 
  Lock, 
  Settings as SettingsIcon, 
  Globe, 
  Moon, 
  Sun, 
  Save,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Initialize dark mode based on class on html element
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <main className="w-full min-h-screen pb-20 transition-colors duration-300">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-3xl font-black text-title transition-colors tracking-tight">Settings</h1>
          <p className="text-gray-500 dark:text-zinc-500 mt-1 font-medium">Manage your security and appearance preferences</p>
        </div>

        <form onSubmit={handleSave} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* System Appearance */}
            <section className="bg-card rounded-[2.5rem] p-8 shadow-sm border border-border transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D9CDB]/10 flex items-center justify-center text-[#2D9CDB] shadow-inner">
                    <Sun size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-title transition-colors tracking-tight">Appearance</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interface Theme</p>
                  </div>
                </div>

                <p className="text-sm text-card-foreground opacity-60 leading-relaxed mb-8">
                  Personalize your dashboard experience with high-contrast themes optimized for productivity and eye-comfort.
                </p>
              </div>

              <div className="flex items-center justify-between p-6 rounded-[2rem] bg-background border border-border group hover:border-[#2D9CDB]/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                    {isDarkMode ? <Moon size={22} className="text-[#2D9CDB]" /> : <Sun size={22} className="text-yellow-500" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-title">Dark Mode</h4>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase">Interactive Toggle</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={toggleDarkMode}
                  className={`relative w-16 h-8 rounded-full transition-all duration-500 focus:outline-none shadow-inner ${isDarkMode ? 'bg-[#2D9CDB]' : 'bg-gray-200 dark:bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isDarkMode ? 'translate-x-8' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </section>

            {/* Account Security */}
            <section className="bg-card rounded-[2.5rem] p-8 shadow-sm border border-border transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-title transition-colors tracking-tight">Security</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Protection</p>
                  </div>
                </div>

                <p className="text-sm text-card-foreground opacity-60 leading-relaxed mb-8">
                  Protect your account with an additional layer of security by requiring a verification code upon login.
                </p>
              </div>

              <div className="flex items-center justify-between p-6 rounded-[2rem] bg-background border border-border group hover:border-green-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <Smartphone size={22} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-title">2FA Auth</h4>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase">Enhanced Safety</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  className={`relative w-16 h-8 rounded-full transition-all duration-500 focus:outline-none shadow-inner ${is2FAEnabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-zinc-800'}`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${is2FAEnabled ? 'translate-x-8' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </section>
          </div>

          <div className="pt-4 max-w-sm mx-auto">
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#2D9CDB] text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:bg-[#2582b8] transition-all active:scale-[0.98]"
            >
              <Save size={18} />
              Save All Settings
            </button>
          </div>
        </form>
      </div>

      {/* Saved Toast */}
      {showSavedToast && (
        <div className="fixed bottom-10 right-10 flex items-center gap-4 bg-white dark:bg-slate-900 shadow-2xl border border-gray-100 dark:border-slate-800 px-6 py-4 rounded-2xl animate-in slide-in-from-bottom-5 duration-300 z-50">
          <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h4 className="font-bold text-[#333333] dark:text-white">Settings Updated!</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">All changes have been successfully applied.</p>
          </div>
        </div>
      )}
    </main>
  );
}
