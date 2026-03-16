"use client";

import React from 'react';
import Header from '@/components/Header';
import { Reply, Send, Calendar, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function PreviewNewsletterPage({ params }: { params: { id: string } }) {
  return (
    <main className="w-full min-h-screen pb-20">
      <Header />
      
      <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto px-4">
        <Link href="/newsletter" className="flex items-center gap-3 text-card-foreground hover:text-[#2D9CDB] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-[#E3F2FD] dark:group-hover:bg-[#2D9CDB]/10 transition-colors">
            <Reply size={20} className="text-[#2D9CDB]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-title leading-tight">Newsletter View</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Post details and management</p>
          </div>
        </Link>
        <div className="flex gap-3">
           <button className="bg-card border border-border text-card-foreground p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all">
              <Share2 size={18} />
           </button>
           <button className="bg-[#2D9CDB] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#1f87c5] transition-all flex items-center gap-2 shadow-lg shadow-blue-100 dark:shadow-none">
              <Send size={18} /> Send to Students
           </button>
        </div>
      </div>

      <div className="bg-card rounded-[2.5rem] p-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-border max-w-5xl mx-auto relative overflow-hidden">
        {/* Background Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D9CDB]/5 blur-[80px] rounded-full -translate-y-12 translate-x-12"></div>
        
        <div className="relative z-10 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[11px] font-bold text-[#2D9CDB] uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1.5 bg-[#E3F2FD] dark:bg-[#2D9CDB]/10 px-3 py-1.5 rounded-lg">
                <Calendar size={12} /> March 14, 2024
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-zinc-900/50 px-3 py-1.5 rounded-lg text-gray-400">
                <Clock size={12} /> 5 Min Read
              </span>
            </div>

            <h2 className="text-4xl font-black text-title leading-[1.15] max-w-4xl tracking-tight">
              Mastering Modern Development Patterns: A Comprehensive Guide for 2024
            </h2>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-border overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="Author" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-title">Samantha Smith</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Editor In Chief</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden aspect-[21/9] shadow-inner border border-border">
             <img 
               src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
               alt="Newsletter Preview" 
               className="w-full h-full object-cover"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8 space-y-8 text-card-foreground/80 leading-[1.8] text-[17px] font-medium">
              <p className="text-2xl font-bold text-title leading-snug text-card-foreground">
                The majority of our readers have requested a deep dive into the state of React Server Components and how they integrate with modern edge computing.
              </p>
              {[1, 2, 3].map((i) => (
                <p key={i}>
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                </p>
              ))}
            </div>

            <div className="md:col-span-4 space-y-8">
               <div className="bg-background/50 border border-border rounded-3xl p-8 space-y-6">
                  <h4 className="font-black text-sm uppercase tracking-widest text-[#2D9CDB]">Highlights</h4>
                  <ul className="space-y-4">
                    {[
                      "Edge Function integration",
                      "Streaming SSR benefits",
                      "Simplified State Management",
                      "Next.js 15 Alpha Roadmap"
                    ].map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm font-bold text-card-foreground opacity-70">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D9CDB] mt-1.5 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="p-1 rounded-3xl bg-gradient-to-br from-[#2D9CDB] to-indigo-600">
                  <div className="bg-card rounded-[1.4rem] p-6 text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Need Help?</p>
                    <p className="text-sm font-bold text-title mb-4">Contact Editorial Team</p>
                    <button className="w-full bg-[#2D9CDB] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#1f87c5] transition-all">
                      Open Support
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
