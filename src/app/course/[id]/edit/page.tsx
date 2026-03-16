"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { ChevronDown, Reply, UploadCloud, Save, Trash2, Edit3, Type, Play, Video } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  
  const [isSaved, setIsSaved] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        router.push('/course');
      }, 2000);
    }, 1000);
  };

  const removeVideo = () => setVideoThumbnail(null);

  return (
    <main className="w-full min-h-screen pb-20 bg-background">
      <Header />
      
      {isSaved && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Save size={18} />
             </div>
             Course updated successfully!
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto px-4">
        <Link href="/course" className="flex items-center gap-3 text-card-foreground hover:text-[#2D9CDB] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-[#E3F2FD] dark:group-hover:bg-[#2D9CDB]/10 transition-colors">
            <Reply size={20} className="text-[#2D9CDB]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-title leading-tight">Edit Course</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update course content and distribution</p>
          </div>
        </Link>
        <div className="flex gap-3">
           <button 
             onClick={() => router.push('/course')}
             className="px-6 py-3 rounded-xl border border-border text-card-foreground font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all flex items-center gap-2"
           >
              Cancel
           </button>
           <button 
             onClick={handleSave}
             disabled={isSubmitting}
             className="bg-[#2D9CDB] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#1f87c5] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none"
           >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={18} />
              )}
              Save Changes
           </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
           <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm space-y-8">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Type size={14} /> Course Title
                </label>
                <input 
                  type="text" 
                  defaultValue="Mastering Modern Development Patterns: A Comprehensive Guide"
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-lg font-bold text-title focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all"
                  placeholder="Enter course name..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Course Type</label>
                <div className="relative">
                  <select className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold text-title appearance-none focus:outline-none">
                    <option>Premium</option>
                    <option>Free</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
           </div>

           <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-title flex items-center gap-2">
                   <Edit3 size={18} className="text-[#2D9CDB]" /> Course Settings
                </h4>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Category</label>
                   <div className="relative">
                      <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium text-title appearance-none focus:outline-none">
                         <option>Development</option>
                         <option>Design</option>
                         <option>Marketing</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Visibility</label>
                   <div className="relative">
                      <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium text-title appearance-none focus:outline-none">
                         <option>Public</option>
                         <option>Private</option>
                         <option>Draft</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   </div>
                </div>
             </div>
           </div>
        </div>

        {/* Sidebar Area */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Course Preview / Video</label>
            
            {videoThumbnail ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden group border border-border bg-[#0A0D11]">
                <img 
                  src={videoThumbnail} 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" 
                  alt="Video Thumbnail" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                      <Play size={24} fill="white" />
                   </div>
                </div>
                <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    type="button"
                    onClick={removeVideo}
                    className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    title="Delete prev video"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button"
                    onClick={() => setVideoThumbnail("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")}
                    className="w-full py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <UploadCloud size={14} /> Reupload Video
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setVideoThumbnail("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")}
                className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2D9CDB] hover:bg-[#2D9CDB]/5 transition-all group"
              >
                <div className="w-12 h-12 bg-[#F0F7FF] dark:bg-zinc-900 rounded-xl flex items-center justify-center text-[#2D9CDB] mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <p className="text-[12px] font-bold text-title mb-1">Upload Course Video</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Drag & drop here</p>
              </div>
            )}
            
            <p className="mt-4 text-[10px] leading-relaxed text-gray-400 font-medium">
               Manage your primary course trailer or introduction video here.
            </p>
          </div>

        </div>
      </form>
    </main>
  );
}
