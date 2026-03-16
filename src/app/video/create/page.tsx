"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import { ChevronDown, Reply, Play, UploadCloud, Save, Trash2, Video as VideoIcon, Layout, MonitorPlay, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function UploadVideoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true';
  
  const [isSaved, setIsSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      setVideoThumbnail("https://images.unsplash.com/photo-1485846234645-a62644ef7467?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
    }
  }, [isEdit]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoThumbnail && !isEdit) {
      alert("Please upload a video first!");
      return;
    }
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      router.push('/video');
    }, 2000);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setVideoThumbnail("https://images.unsplash.com/photo-1485846234645-a62644ef7467?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeVideo = () => setVideoThumbnail(null);

  return (
    <main className="w-full min-h-screen pb-20">
      <Header />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="video/*" 
        onChange={handleFileChange}
      />

      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto px-4">
        <Link href="/video" className="flex items-center gap-3 text-card-foreground hover:text-[#2D9CDB] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-[#E3F2FD] dark:group-hover:bg-[#2D9CDB]/10 transition-colors">
            <Reply size={20} className="text-[#2D9CDB]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-title leading-tight">{isEdit ? 'Edit Video' : 'Add New Video'}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
               {isEdit ? 'Update existing video content' : 'Upload a fresh course video'}
            </p>
          </div>
        </Link>
        <div className="flex gap-3">
           <button 
             onClick={() => router.push('/video')}
             className="px-6 py-3 rounded-xl border border-border text-card-foreground font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
           >
              Cancel
           </button>
           <button 
             onClick={handleSave}
             className="bg-[#2D9CDB] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#1f87c5] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none cursor-pointer"
           >
              <Save size={18} /> {isEdit ? 'Save Changes' : 'Upload Now'}
           </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
           <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm space-y-8">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <VideoIcon size={14} /> Video Name
                </label>
                <input 
                  type="text" 
                  defaultValue={isEdit ? "Advanced TypeScript Generics Explained" : ""}
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-lg font-bold text-title focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all placeholder:text-gray-400"
                  placeholder="Enter video title..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <Layout size={14} /> Select Course
                  </label>
                  <div className="relative">
                    <select className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold text-title appearance-none focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all cursor-pointer font-bold">
                      <option>React Mastery 2024</option>
                      <option>Node.js Fundamentals</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                    <MonitorPlay size={14} /> Sub Course
                  </label>
                  <div className="relative">
                    <select className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold text-title appearance-none focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all cursor-pointer font-bold">
                      <option>Advanced Patterns</option>
                      <option>Introduction</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
           </div>
        </div>

        {/* Video Preview Side */}
        <div className="md:col-span-4 space-y-6">
           <div className="bg-card rounded-3xl p-8 border border-border shadow-sm min-h-[300px] flex flex-col">
             <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Video File</label>
             
             {isUploading ? (
               <div className="flex-1 border-2 border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-background/50">
                 <div className="relative w-20 h-20 mb-6">
                    <svg className="w-20 h-20 -rotate-90">
                      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-border" />
                      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[#2D9CDB]" strokeDasharray={226} strokeDashoffset={226 - (226 * uploadProgress) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-title">
                      {uploadProgress}%
                    </div>
                 </div>
                 <h4 className="font-bold text-title mb-1">Uploading Video...</h4>
                 <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Please wait while we process your file</p>
               </div>
             ) : videoThumbnail ? (
               <div className="relative aspect-video rounded-2xl overflow-hidden group border border-border bg-[#0A0D11] flex-1">
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
                 <div className="absolute top-3 right-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
                   <button 
                     type="button"
                     onClick={removeVideo}
                     className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
                     title="Remove Video"
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
                 <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     type="button"
                     onClick={triggerFileInput}
                     className="w-full py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                   >
                     <UploadCloud size={14} /> {isEdit ? 'Reupload Video' : 'Upload Course'}
                   </button>
                 </div>
               </div>
             ) : (
               <div 
                 onClick={triggerFileInput}
                 className="flex-1 border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2D9CDB] hover:bg-[#2D9CDB]/5 transition-all group"
               >
                 <div className="w-12 h-12 bg-[#F0F7FF] dark:bg-zinc-900 rounded-xl flex items-center justify-center text-[#2D9CDB] mb-3 group-hover:scale-110 transition-transform">
                   <UploadCloud size={24} />
                 </div>
                 <p className="text-[12px] font-bold text-title mb-1">{isEdit ? 'Choose New Video' : 'Upload MP4 Video'}</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Drag & drop here</p>
               </div>
             )}
             
             <p className="mt-4 text-[10px] leading-relaxed text-gray-400 font-medium">
                Max file size: **500MB**. Supports MP4, WebM.
             </p>
           </div>
        </div>
      </form>

      {/* Success Toast */}
      {isSaved && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-3 font-bold z-[200]">
           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 size={18} />
           </div>
           {isEdit ? 'Changes Saved Successfully!' : 'Video Uploaded Successfully!'}
        </div>
      )}
    </main>
  );
}

export default function UploadVideoPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-title font-bold">Loading...</div>}>
      <UploadVideoContent />
    </Suspense>
  );
}
