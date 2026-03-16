"use client";

import React from 'react';
import Header from '@/components/Header';
import { ChevronDown, Reply, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateCoursePage() {
  const [isPublished, setIsPublished] = React.useState(false);
  const router = useRouter();

  const handlePublish = () => {
    setIsPublished(true);
    setTimeout(() => {
      setIsPublished(false);
      router.push('/course');
    }, 2000);
  };

  return (
    <main className="w-full min-h-screen pb-20 bg-background">
      <Header />
      
      {isPublished && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <UploadCloud size={18} />
             </div>
             Course published successfully!
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto px-4">
        <Link href="/course" className="flex items-center gap-2 text-card-foreground hover:text-[#2D9CDB] transition-colors">
          <Reply size={20} className="text-[#2D9CDB]" />
          <h3 className="text-xl font-bold text-title transition-colors">Create Course</h3>
        </Link>
        <button 
          onClick={handlePublish}
          className="bg-[#2D9CDB] text-white px-8 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors shadow-sm cursor-pointer border-none"
        >
          Publish
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="col-span-8 bg-card rounded-2xl p-8 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] border border-border">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-card-foreground mb-2">Course Name</label>
              <input 
                type="text" 
                placeholder="Course Name" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background dark:bg-zinc-900/50 text-sm text-card-foreground focus:outline-none focus:border-[#2D9CDB] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-card-foreground opacity-50 mb-2">Course Type</label>
              <div className="relative">
                <select className="w-full appearance-none px-4 py-3 rounded-xl border border-border bg-background dark:bg-zinc-900/50 text-sm text-card-foreground focus:outline-none focus:border-[#2D9CDB] transition-all cursor-pointer">
                  <option className="bg-card">Free</option>
                  <option className="bg-card">Premium</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Area */}
        <div className="col-span-4 space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] border border-border">
            <label className="block text-sm font-bold text-card-foreground opacity-50 mb-4 uppercase tracking-tight">Thumbnail</label>
            <div className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2D9CDB] transition-all group">
              <div className="w-12 h-12 bg-blue-50 dark:bg-zinc-900/50 rounded-full flex items-center justify-center text-[#2D9CDB] mb-4 group-hover:bg-[#2D9CDB] group-hover:text-white transition-all shadow-sm">
                <UploadCloud size={24} />
              </div>
              <p className="text-sm font-medium text-card-foreground mb-1">Click to upload <span className="text-gray-400">or drag and drop</span></p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
