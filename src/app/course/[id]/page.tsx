"use client";

import React from 'react';
import Header from '@/components/Header';
import { Reply, Star } from 'lucide-react';
import Link from 'next/link';

export default function ViewCoursePage({ params }: { params: { id: string } }) {
  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <Link href="/course" className="flex items-center gap-2 text-card-foreground hover:text-[#2D9CDB] transition-colors">
          <Reply size={20} className="text-[#2D9CDB]" />
          <h3 className="text-xl font-bold text-title transition-colors">View Course</h3>
        </Link>
 Broadway
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="col-span-8 bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#333333] mb-2">Course Name</label>
              <div className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-[#F8FAFC] text-sm text-gray-500">
                Course Name
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#333333] mb-2">Course Type</label>
              <div className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-[#F8FAFC] text-sm text-gray-500">
                Free
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#333333] mb-2">Sub Course</label>
              <div className="w-full px-4 py-6 rounded-xl border border-gray-100 bg-white text-sm text-gray-400 min-h-[200px]">
                Sub course 1, Sub course 2
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="col-span-4 space-y-6">
          {/* Thumbnail Preview */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 overflow-hidden">
             <label className="block text-sm font-bold text-[#333333] mb-4">Thumbnail</label>
             <div className="rounded-xl overflow-hidden aspect-video border border-gray-50">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>

          {/* Stats Boxes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex items-center justify-between">
            <span className="text-sm font-bold text-[#333333]">Video</span>
            <span className="text-2xl font-black text-[#333333]">300</span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex items-center justify-between">
            <span className="text-sm font-bold text-[#333333]">Review</span>
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#2D9CDB]">4.5</span>
                <Star size={18} className="fill-[#2D9CDB] text-[#2D9CDB]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
