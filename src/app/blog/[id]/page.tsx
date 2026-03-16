"use client";

import React from 'react';
import Header from '@/components/Header';
import { Reply, MessageSquare, Trash2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PreviewBlogPage({ params }: { params: { id: string } }) {
  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <Link href="/blog" className="flex items-center gap-2 text-card-foreground hover:text-[#2D9CDB] transition-colors">
          <Reply size={20} className="text-[#2D9CDB]" />
          <h3 className="text-xl font-bold text-title transition-colors">Preview Blog</h3>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-50 max-w-5xl mx-auto">
        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden aspect-[16/7]">
             <img 
               src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
               alt="Blog Preview" 
               className="w-full h-full object-cover"
             />
          </div>

          <h1 className="text-2xl font-bold text-title leading-tight transition-colors">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,
          </h1>
 Broadway

          <div className="space-y-6 text-[#555555] leading-loose text-[15px]">
            {[1, 2, 3, 4].map((i) => (
              <p key={i}>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
              </p>
            ))}
          </div>

          {/* Comments Section */}
          <div className="pt-12 border-t border-gray-100">
            <div className="space-y-8">
               {/* Individual Comment */}
               <div className="flex gap-4">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" className="w-10 h-10 rounded-full object-cover" alt="User" />
                  <div className="flex-1">
                     <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-[#333333]">Rosa H. KELLY</span>
                        <Reply size={16} className="text-[#2D9CDB] cursor-pointer" />
                     </div>
                     <p className="text-xs text-gray-400">Type Your Comment</p>
                  </div>
               </div>

               {/* Comment with Thread */}
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <img src="https://images.unsplash.com/photo-1554151228-14d9def656ec?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" className="w-10 h-10 rounded-full object-cover" alt="User" />
                     <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                           <span className="text-sm font-bold text-[#333333]">Alva L. Hagen</span>
                           <div className="flex items-center gap-3">
                              <button className="text-[10px] font-bold text-[#27AE60] hover:underline">Approve</button>
                              <button className="text-[10px] font-bold text-[#EB5757] hover:underline">Remove</button>
                           </div>
                        </div>
                        <p className="text-xs text-[#555555] mb-2 font-medium">test comment</p>
                        <div className="flex items-center gap-6">
                           <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">Reply</button>
                           <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">1 Replies</button>
                        </div>
                     </div>
                  </div>

                  {/* Nesting / Reply */}
                  <div className="pl-14 flex gap-4">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" className="w-8 h-8 rounded-full object-cover" alt="User" />
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-1">
                           <span className="text-xs font-bold text-[#333333]">Alva L. Hagen</span>
                           <button className="text-[9px] font-bold text-[#EB5757] hover:underline">Remove</button>
                        </div>
                        <p className="text-xs text-[#555555] font-medium leading-relaxed">test comment</p>
                    </div>
                  </div>
               </div>

               {/* Another user */}
               <div className="flex gap-4">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" className="w-10 h-10 rounded-full object-cover" alt="User" />
                  <div className="flex-1">
                     <span className="text-sm font-bold text-[#333333] block mb-1">Alva L. Hagen</span>
                     <p className="text-xs text-[#555555] font-medium mb-1">test comment</p>
                     <button className="text-[10px] font-bold text-gray-400 hover:text-gray-600 transition-colors">Reply</button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
