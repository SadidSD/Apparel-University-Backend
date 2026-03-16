"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, Reply, UploadCloud, Send, Save, Image as ImageIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateNewsletterPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
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
            <h3 className="text-xl font-bold text-title leading-tight">Create News Letter</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Draft and broadcast to students</p>
          </div>
        </Link>
        <div className="flex gap-3">
           <button 
             onClick={() => router.push('/newsletter')}
             className="px-6 py-3 rounded-xl border border-border text-card-foreground font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
           >
              Save Draft
           </button>
           <button 
             onClick={handlePublish}
             className="bg-[#2D9CDB] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#1f87c5] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none"
           >
              <Send size={18} /> Publish & Send
           </button>
        </div>
      </div>

      <form onSubmit={handlePublish} className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm space-y-8">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Newsletter Title</label>
              <input 
                type="text" 
                placeholder="Enter a compelling title..." 
                className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-lg font-bold text-title focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Category</label>
              <div className="relative">
                <select className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold text-title appearance-none focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all cursor-pointer">
                   <option className="bg-card">Announcements</option>
                   <option className="bg-card">Tutorials</option>
                   <option className="bg-card">Weekly Insights</option>
                   <option className="bg-card">Event Updates</option>
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <ImageIcon size={14} className="text-[#2D9CDB]" /> Newsletter Content
              </label>
              
              <div className="relative group overflow-hidden bg-background border border-border rounded-3xl p-1 transition-all focus-within:ring-2 focus-within:ring-[#2D9CDB]/20">
                <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-card/50">
                  <div className="w-8 h-8 rounded-lg bg-[#2D9CDB]/10 flex items-center justify-center text-[#2D9CDB]">
                    <ImageIcon size={18} />
                  </div>
                  <p className="text-xs font-bold text-title">Smart Content Assistant</p>
                  <div className="ml-auto flex gap-2">
                    <button type="button" className="text-[10px] font-black bg-[#2D9CDB] text-white px-3 py-1 rounded-md hover:bg-[#1f87c5] transition-all">
                      Edit with AI
                    </button>
                  </div>
                </div>
                <textarea 
                  rows={12}
                  placeholder="Write your newsletter content here... 'Edit with AI' to refine your message."
                  className="w-full bg-transparent border-none px-6 py-6 text-sm font-medium text-title focus:outline-none placeholder:text-gray-400 resize-none"
                ></textarea>
                
                {/* Floating Image Icon Overlay */}
                <div className="absolute right-6 bottom-6 w-12 h-12 rounded-2xl bg-card border border-border flex items-center justify-center text-[#2D9CDB] shadow-lg cursor-pointer hover:scale-110 transition-transform group-hover:bg-[#2D9CDB]/5">
                   <ImageIcon size={24} />
                </div>
              </div>
              
              <div className="flex gap-4">
                 <button type="button" className="flex-1 py-3 rounded-2xl border border-dashed border-border text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#2D9CDB] hover:border-[#2D9CDB] transition-all">
                    Add Image Block
                 </button>
                 <button type="button" className="flex-1 py-3 rounded-2xl border border-dashed border-border text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#2D9CDB] hover:border-[#2D9CDB] transition-all">
                    Add Button Tool
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Feature Image</label>
            
            {coverImage ? (
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden group border border-border">
                <img 
                  src={coverImage} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Featured Preview" 
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
              </div>
            ) : (
              <div 
                onClick={() => setCoverImage("https://images.unsplash.com/photo-1542435503-956c469947f6")}
                className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2D9CDB] hover:bg-[#2D9CDB]/5 transition-all group"
              >
                <div className="w-14 h-14 bg-[#F0F7FF] dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-[#2D9CDB] mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <UploadCloud size={28} />
                </div>
                <p className="text-sm font-bold text-title mb-1">Click to upload</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Drag & drop image here</p>
              </div>
            )}
            
            <p className="mt-4 text-[10px] text-gray-400 leading-relaxed">
               SVG, PNG, JPG or GIF (MAX. 1200x630px)
            </p>
            {coverImage && (
              <button 
                type="button"
                onClick={() => setCoverImage("https://images.unsplash.com/photo-1542435503-956c469947f6")}
                className="w-full mt-4 py-3 border border-border rounded-xl text-title text-xs font-bold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
              >
                Reupload Image
              </button>
            )}
          </div>

          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Search Tags</label>
            <textarea 
              rows={6}
              placeholder="e.g. #update, #tutorial, #announcement" 
              className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm font-medium text-title focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all resize-none"
            ></textarea>
            <p className="mt-2 text-[10px] text-gray-400 font-medium italic">Separated by commas</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-[#2D9CDB]/20 rounded-3xl p-8">
             <h4 className="font-black text-sm uppercase tracking-widest text-[#2D9CDB] mb-4">Audience</h4>
             <div className="space-y-3">
                {["All Students", "Active Members", "Newsletter Subscribers"].map((label, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                     <div className="w-5 h-5 rounded-md border-2 border-border flex items-center justify-center group-hover:border-[#2D9CDB] transition-colors">
                        {i === 0 && <div className="w-2.5 h-2.5 rounded-sm bg-[#2D9CDB]"></div>}
                     </div>
                     <span className="text-sm font-bold text-card-foreground opacity-70 group-hover:opacity-100 transition-opacity">{label}</span>
                  </label>
                ))}
             </div>
          </div>
        </div>
      </form>

      {/* Publishing Overlay */}
      {isPublishing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
           <div className="bg-card border border-border rounded-[2.5rem] p-12 max-w-md w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-[#E3F2FD] dark:bg-[#2D9CDB]/10 rounded-full flex items-center justify-center text-[#2D9CDB] mx-auto mb-8 animate-pulse">
                <Send size={40} />
              </div>
              <h3 className="text-2xl font-black text-title mb-4 tracking-tight">Broadcasting...</h3>
              <p className="text-card-foreground opacity-60 font-medium mb-8 leading-relaxed">
                 Updating student dashboards and sending out notifications. This will take a moment.
              </p>
              <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                 <div className="h-full bg-[#2D9CDB] animate-[loading_2s_ease-in-out_infinite]"></div>
              </div>
           </div>
        </div>
      )}
    </main>
  );
}
