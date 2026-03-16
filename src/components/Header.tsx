"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bell, 
  User, 
  IdCard, 
  ChevronDown, 
  Edit, 
  X, 
  MapPin, 
  Phone, 
  Camera, 
  CheckCircle2,
  Settings,
  LogOut,
  Search
} from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Samantha Smith',
    address: '123 Dhaka, Bangladesh',
    number: '+880 1712 345 678',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    id: 'STU-1084'
  });

  // Temporary state for editing
  const [tempProfile, setTempProfile] = useState({ ...profile });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setProfile({ ...tempProfile });
    setIsEditModalOpen(false);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <header className="flex justify-between items-center bg-card px-8 py-6 mb-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] relative z-50 transition-colors duration-300">
      <div>
        <h2 className="text-3xl font-bold text-title mb-1 transition-colors">Dashboard</h2>
        <p className="text-[#2D9CDB] text-sm font-medium italic">Hi, {profile.name.split(' ')[0]}. Welcome back to Sedap Admin!</p>
      </div>
      
      <div className="flex items-center gap-6">
        <Link href="/notification">
          <div className="relative cursor-pointer bg-background border border-border p-3 rounded-xl text-[#2D9CDB] hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors">
            <Bell size={24} />
            <span className="absolute -top-2 -right-2 bg-[#2D9CDB] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-card">
              21
            </span>
          </div>
        </Link>
        
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 ml-2 border-l border-border pl-6 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium whitespace-nowrap">Hello, <span className="font-bold text-card-foreground transition-colors">{profile.name}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#E3F2FD] dark:border-zinc-800 group-hover:border-[#2D9CDB] transition-all shadow-sm">
                <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <ChevronDown size={16} className={`text-gray-400 group-hover:text-[#2D9CDB] transition-all duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>

          {/* Profile Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-72 bg-card rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="p-6 bg-gradient-to-br from-[#F0F7FF] to-card dark:from-zinc-900/50 dark:to-card border-b border-border text-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-card shadow-md mx-auto mb-3 relative group">
                  <img src={profile.image} alt="Profile big" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-card-foreground">{profile.name}</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-[#E3F2FD] dark:bg-[#2D9CDB]/20 text-[#2D9CDB] text-[10px] font-bold uppercase tracking-wider mt-1">
                  Premium Student
                </span>
                
                <button 
                  onClick={() => { setIsEditModalOpen(true); setIsDropdownOpen(false); setTempProfile({...profile}); }}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2D9CDB] text-white text-xs font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-[#2582b8] transition-all active:scale-95"
                >
                  <Edit size={14} /> Edit Profile
                </button>
              </div>
              
              <div className="p-2">
                <div className="flex flex-col gap-1 p-3">
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-background transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F7FB] dark:bg-zinc-900 flex items-center justify-center text-[#2D9CDB]">
                      <IdCard size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tight">Student ID</p>
                      <p className="text-sm font-semibold text-card-foreground">{profile.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-background transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#F2F7FB] dark:bg-zinc-900 flex items-center justify-center text-[#2D9CDB]">
                      <Settings size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tight">Account Type</p>
                      <p className="text-sm font-semibold text-card-foreground">Full Stack Student</p>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-border mx-4 my-1"></div>
                <div className="p-1">
                  <button 
                    onClick={() => router.push('/signout')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold text-sm transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/10 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <LogOut size={18} />
                    </div>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
          <div className="bg-card rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-border animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <h2 className="text-xl font-bold text-card-foreground">Manage Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-card-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-card shadow-xl">
                    <img src={tempProfile.image} alt="Avatar Preview" className="w-full h-full object-cover" />
                  </div>
                  <button 
                    onClick={handleImageClick}
                    className="absolute -bottom-2 -right-2 bg-[#2D9CDB] text-white p-2.5 rounded-xl shadow-lg hover:bg-[#2582b8] transition-all"
                  >
                    <Camera size={18} />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                </div>
                <p className="mt-3 text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">Click to upload photo</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tight flex items-center gap-2">
                    <User size={12} className="text-[#2D9CDB]" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tight flex items-center gap-2">
                    <Phone size={12} className="text-[#2D9CDB]" /> Mobile Number
                  </label>
                  <input 
                    type="text" 
                    value={tempProfile.number}
                    onChange={(e) => setTempProfile({ ...tempProfile, number: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-tight flex items-center gap-2">
                    <MapPin size={12} className="text-[#2D9CDB]" /> Address
                  </label>
                  <textarea 
                    rows={2}
                    value={tempProfile.address}
                    onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-5 py-4 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all font-medium resize-none"
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-4 text-gray-500 font-bold text-sm bg-background border border-border rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveProfile}
                  className="flex-1 bg-[#2D9CDB] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 dark:shadow-none hover:bg-[#2582b8] transition-all"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Toast */}
      {showSavedToast && (
        <div className="fixed bottom-10 right-10 flex items-center gap-4 bg-card shadow-2xl border border-border px-6 py-4 rounded-2xl animate-in slide-in-from-bottom-5 duration-300 z-[200]">
          <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <h4 className="font-bold text-card-foreground">Profile Updated!</h4>
            <p className="text-xs text-gray-500 dark:text-zinc-400">Your information has been successfully saved.</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
