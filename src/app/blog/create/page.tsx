"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import { ChevronDown, Reply, UploadCloud, Save, Trash2, Edit3, Type, Hash, Layers } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function CreateBlogPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#2D9CDB]/30 border-t-[#2D9CDB] rounded-full animate-spin"></div></div>}>
      <CreateBlogContent />
    </Suspense>
  );
}

function CreateBlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const isEdit = !!id;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Existing blog data for edit mode
  useEffect(() => {
    if (isEdit) {
      setCoverImage("https://images.unsplash.com/photo-1499750310107-5fef28a66643");
    }
  }, [isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Navigate back after success
      setTimeout(() => {
        router.push('/blog');
      }, 1500);
    }, 1000);
  };

  const removeImage = () => setCoverImage(null);

  return (
    <main className="w-full min-h-screen pb-20">
      <Header />
      
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Save size={18} />
             </div>
             {isEdit ? 'Blog post updated successfully!' : 'Blog post published successfully!'}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto px-4">
        <Link href="/blog" className="flex items-center gap-3 text-card-foreground hover:text-[#2D9CDB] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-[#E3F2FD] dark:group-hover:bg-[#2D9CDB]/10 transition-colors">
            <Reply size={20} className="text-[#2D9CDB]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-title leading-tight">{isEdit ? 'Edit Blog Post' : 'Create New Blog'}</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {isEdit ? 'Update existing content and media' : 'Share your knowledge with the community'}
            </p>
          </div>
        </Link>
        <div className="flex gap-3">
           <button 
             onClick={() => router.push('/blog')}
             className="px-6 py-3 rounded-xl border border-border text-card-foreground font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
           >
              Cancel
           </button>
           <button 
             onClick={handleSubmit}
             disabled={isSubmitting}
             className="bg-[#2D9CDB] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#1f87c5] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none"
           >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save size={18} />
              )}
              {isEdit ? 'Save Changes' : 'Publish Post'}
           </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-6">
           <div className="bg-card rounded-[2rem] p-8 border border-border shadow-sm space-y-8">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Type size={14} /> Blog Title
                </label>
                <input 
                  type="text" 
                  defaultValue={isEdit ? "Mastering Advanced React Patterns and Solid Principles" : ""}
                  className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-lg font-bold text-title focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all placeholder:text-gray-400"
                  placeholder="Enter a compelling title..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                  <Layers size={14} /> Select Category
                </label>
                <div className="relative">
                  <select className="w-full bg-background border border-border rounded-2xl px-6 py-4 text-sm font-bold text-title appearance-none focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all cursor-pointer">
                    <option>Tech & Development</option>
                    <option>Education</option>
                    <option>UI/UX Design</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
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
                    rows={12}
                    defaultValue={isEdit ? "React has evolved significantly with the introduction of Server Components. In this deep dive, we explore how to leverage these new patterns while maintaining a clean architecture and following SOLID principles to ensure your codebase remains scalable and maintainable." : ""}
                    className="w-full bg-background border border-border rounded-2xl px-6 py-5 text-[15px] leading-relaxed text-card-foreground/80 focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all resize-none placeholder:text-gray-400"
                    placeholder="Write your blog content here..."
                  ></textarea>
                </div>
              </div>
           </div>

           <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-title flex items-center gap-2">
                   <Edit3 size={18} className="text-[#2D9CDB]" /> Editor Settings
                </h4>
             </div>
             <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Publish Date</label>
                   <input 
                     type="date" 
                     defaultValue={isEdit ? "2024-03-14" : new Date().toISOString().split('T')[0]} 
                     className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium text-title focus:outline-none" 
                   />
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Visibility</label>
                   <div className="relative">
                      <select className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-medium text-title appearance-none focus:outline-none">
                         <option>Public</option>
                         <option>Premium Only</option>
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
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Features Image</label>
            
            {coverImage ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden group border border-border">
                <img 
                  src={coverImage} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt="Current Post Thumb" 
                />
                <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button"
                    onClick={() => setCoverImage("https://images.unsplash.com/photo-1499750310107-5fef28a66643")}
                    className="w-full py-2 bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-bold hover:bg-white/30 transition-all"
                  >
                    Reupload
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setCoverImage("https://images.unsplash.com/photo-1499750310107-5fef28a66643")}
                className="border-2 border-dashed border-border rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2D9CDB] hover:bg-[#2D9CDB]/5 transition-all group"
              >
                <div className="w-12 h-12 bg-[#F0F7FF] dark:bg-zinc-900 rounded-xl flex items-center justify-center text-[#2D9CDB] mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <p className="text-[12px] font-bold text-title mb-1">Click to upload</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SVG, PNG, JPG (Max 2MB)</p>
              </div>
            )}
            
            <p className="mt-4 text-[10px] leading-relaxed text-gray-400 font-medium">
               Recommended size: **800x400px**. 
            </p>
          </div>

          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Hash size={14} /> Add Tags
            </label>
            <textarea 
              rows={4}
              defaultValue={isEdit ? "react, nextjs, typescript, programming" : ""}
              placeholder="Enter tags separated by commas..." 
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-[#2D9CDB]/20 transition-all resize-none placeholder:text-gray-400"
            ></textarea>
            <p className="mt-2 text-[10px] text-gray-400">Separate tags with commas for better indexing.</p>
          </div>
        </div>
      </form>
    </main>
  );
}
