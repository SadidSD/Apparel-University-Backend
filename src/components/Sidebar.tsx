"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  FileText, 
  Mail, 
  BookOpen, 
  Video, 
  LayoutList, 
  UserSquare2, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Students', icon: <Users size={20} />, path: '/students' },
    { name: 'Blog', icon: <FileText size={20} />, path: '/blog' },
    { name: 'News Letter', icon: <Mail size={20} />, path: '/newsletter' },
    { name: 'Course', icon: <BookOpen size={20} />, path: '/course' },
    { name: 'Video', icon: <Video size={20} />, path: '/video' },
    { name: 'Author', icon: <UserSquare2 size={20} />, path: '/author' },
  ];

  const bottomItems = [
    { name: 'Setting', icon: <Settings size={20} />, path: '/setting' },
    { name: 'Sign Out', icon: <LogOut size={20} />, path: '/signout' },
  ];

  return (
    <div className="w-64 bg-card h-screen flex flex-col border-r border-border shadow-sm fixed left-0 top-0 z-10 transition-colors duration-300">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-md bg-[#2D9CDB] flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <h1 className="text-2xl font-bold text-card-foreground transition-colors">Sedap<span className="text-[#2D9CDB]">.</span></h1>
        </div>
        <p className="text-xs text-gray-400 dark:text-zinc-500 mb-6 uppercase tracking-wider transition-colors">Modern Admin Dashboard</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-[#E3F2FD] dark:bg-[#2D9CDB]/10 text-[#2D9CDB] font-semibold relative after:absolute after:left-[-16px] after:top-0 after:bottom-0 after:w-1 after:bg-[#2D9CDB] after:rounded-r-md' 
                      : 'text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#2D9CDB]' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-4 mb-4">
        <ul className="space-y-2">
          {bottomItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                   className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-[#E3F2FD] dark:bg-[#2D9CDB]/10 text-[#2D9CDB] font-semibold relative' 
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#2D9CDB]' : 'text-gray-400'}>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
