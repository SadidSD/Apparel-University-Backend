"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, Reply, Send, Calendar, Clock, Image as ImageIcon, Save, X, Edit3, Trash2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditNewsletterPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>("https://images.unsplash.com/photo-1542435503-956c469947f6");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      router.push('/newsletter');
    }, 2000);
  };

  const removeImage = () => setCoverImage(null);

  return (
    <main className="w-full min-h-screen pb-20">
      <Header />
      
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto px-4">
        <Link href="/newsletter" className="flex items-center gap-3 text-card-foreground hover:text-[#2D9CDB] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-[#E3F2FD] dark:group-hover:bg-[#2D9CDB]/10 transition-colors">
            <Reply size={20} className="text-[#2D9CDB]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-title leading-tight">Edit Newsletter</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update post content and distribution</p>
          </div>
        </Link>
        <div className="flex gap-3">
           <button 
             onClick={() => router.push('/newsletter')}
             className="px-6 py-3 rounded-xl border border-border text-card-foreground font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all flex items-center gap-2"
           >
              Cancel
           </button>
           <button 
             onClick={handleSave}
             className="bg-[#2D9CDB] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#1f87c5] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none"
           >
              <Save size={18} /> Save Changes
           </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
           <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm space-y-8">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Newsletter Title</label>
                <input 
                  type="text" 
                  defaultValue="Mastering Modern Development Patterns: A Comprehensive Guide for 2024"
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-lg font-bold text-title focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all"
                  placeholder="Enter a compelling title..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Post Content</label>
                  <div className="flex gap-1.5 p-1 bg-background border border-border rounded-lg">
                    {["B", "I", "U", "Link", "List"].map((tool) => (
                      <button key={tool} type="button" className="w-8 h-8 flex items-center justify-center text-[10px] font-black hover:bg-[#2D9CDB] hover:text-white rounded-md transition-all text-title opacity-60 hover:opacity-100">
                        {tool[0]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative group">
                  <textarea 
                    rows={15}
                    defaultValue="The majority of our readers have requested a deep dive into the state of React Server Components and how they integrate with modern edge computing. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form."
                    className="w-full bg-background border border-border rounded-2xl px-6 py-5 text-[15px] leading-relaxed text-card-foreground/80 focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all resize-none"
                    placeholder="Write your newsletter content here..."
                  ></textarea>
                  <button 
                    type="button"
                    className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2D9CDB] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                    title="Add new content block"
                  >
                    <span className="text-xl font-bold">+</span>
                  </button>
                </div>
              </div>
           </div>

           <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-title flex items-center gap-2">
                   <Edit3 size={18} className="text-[#2D9CDB]" /> Editor Settings
                </h4>
                <div className="flex gap-2">
                   <button type="button" className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-900 text-gray-400 hover:text-title transition-colors">
                      <Trash2 size={16} />
                   </button>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Publish Date</label>
                   <div className="relative">
                      <input type="date" defaultValue="2024-03-14" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium text-title focus:outline-none" />
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Distribution</label>
                   <div className="relative">
                      <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium text-title appearance-none focus:outline-none">
                         <option>All Students</option>
                         <option>Premium Only</option>
                         <option>Graduates</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                   </div>
                </div>
             </div>
           </div>
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Cover Image</label>
              
              {coverImage ? (
                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden group border border-border">
                  <img 
                    src={coverImage} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt="Current Cover" 
                  />
                  <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      title="Delete Image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      type="button"
                      onClick={() => setCoverImage("https://images.unsplash.com/photo-1542435503-956c469947f6")}
                      className="w-full py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold hover:bg-white/30 transition-all"
                    >
                      Reupload
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => setCoverImage("https://images.unsplash.com/photo-1542435503-956c469947f6")}
                  className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2D9CDB] hover:bg-[#2D9CDB]/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#F0F7FF] dark:bg-zinc-900 rounded-xl flex items-center justify-center text-[#2D9CDB] mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-[12px] font-bold text-title mb-1">Reupload Image</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Drag & drop here</p>
                </div>
              )}
              
              <p className="mt-4 text-[10px] leading-relaxed text-gray-400 font-medium">
                 Recommended size: **1200x630px**. 
                 Supports JPG, PNG, WEBP.
              </p>
           </div>

           <div className="bg-gradient-to-br from-indigo-500/10 to-[#2D9CDB]/10 border border-[#2D9CDB]/20 rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-[#2D9CDB] flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
                 <Send size={24} />
              </div>
              <h4 className="text-lg font-bold text-title mb-2">Ready to send?</h4>
              <p className="text-sm text-card-foreground/60 leading-relaxed mb-6">
                 Saving changes will automatically update the preview for students currently logged in.
              </p>
              <button 
                type="submit"
                className="w-full bg-white dark:bg-zinc-900 border border-border text-title py-4 rounded-2xl text-sm font-black hover:bg-[#2D9CDB] hover:text-white hover:border-[#2D9CDB] hover:shadow-xl transition-all active:scale-[0.98]"
              >
                 Send to Students
              </button>
           </div>
        </div>
      </form>

      {/* Success Toast */}
      {isSaved && (
        <div className="fixed bottom-10 right-10 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-3 font-bold z-[200]">
           <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Save size={18} />
           </div>
           Newsletter Updated & Sent!
        </div>
      )}
    </main>
  );
}
