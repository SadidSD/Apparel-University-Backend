import React from 'react';
import { Bell } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white px-8 py-6 mb-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
      <div>
        <h2 className="text-3xl font-bold text-[#333333] mb-1">Dashboard</h2>
        <p className="text-[#2D9CDB] text-sm font-medium">Hi, Samantha. Welcome back to Sedap Admin!</p>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer bg-[#F0F7FF] p-3 rounded-xl text-[#2D9CDB]">
          <Bell size={24} />
          <span className="absolute -top-2 -right-2 bg-[#2D9CDB] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white">
            21
          </span>
        </div>
        
        <div className="flex items-center gap-3 ml-2 border-l border-gray-100 pl-6 cursor-pointer">
          <div className="text-right">
            <p className="text-xs text-gray-500">Hello, <span className="font-bold text-[#333333]">Samantha</span></p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#E3F2FD]">
            {/* Using a placeholder image that looks roughly like the one in the screenshot */}
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
