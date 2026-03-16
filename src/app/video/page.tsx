"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, X, Play, Video, HelpCircle } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Link from 'next/link';

const mockTitle = "There are many variations of passages of";
const mockCourseName = "printing, and typesetting, industry Lorem, Ipsum has";
const mockSubCourse = "typesetting";

// Generate mock data for pagination testing
const generateVideos = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Video Title ${i + 1}: ${mockTitle}`,
    courseName: mockCourseName,
    subCourse: mockSubCourse,
    view: `${Math.floor(Math.random() * 500) + 50}`,
    question: 'View'
  }));
};

export default function VideoPage() {
  const [data, setData] = useState(() => generateVideos(45));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<any>(null);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
  };

  const handleRowClick = (video: any) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleDelete = (e: React.MouseEvent, video: any) => {
    e.stopPropagation();
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (videoToDelete) {
      setData(prev => prev.filter(v => v.id !== videoToDelete.id));
      if (selectedVideo?.id === videoToDelete.id) closeModal();
      setVideoToDelete(null);
    }
  };

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-xl font-bold text-title transition-colors">Video</h3>
         <Link href="/video/create">
           <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors shadow-sm cursor-pointer border-none">
             Add New Video
           </button>
         </Link>
      </div>
      
      {/* Wrap table in blue border like screenshot */}
      <div className="list-container border-2 border-[#2D9CDB]/30">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-5 pl-4 uppercase tracking-wider">VIDEO TITTLE</div>
          <div className="col-span-4 uppercase tracking-wider">COURSE NAME</div>
          <div className="col-span-2 text-center uppercase tracking-wider">SUB COURSE</div>
          <div className="col-span-1 text-center uppercase tracking-wider">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.map((video, index) => (
            <div 
              key={video.id} 
              onClick={() => handleRowClick(video)}
              className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'list-row-even' : 'list-row-odd'}`}
            >
              <div className="col-span-5 pl-4 pr-2 font-medium leading-relaxed text-card-foreground">
                {video.title}
              </div>
              
              <div className="col-span-4 font-medium leading-relaxed text-card-foreground opacity-60 text-sm">
                {video.courseName}
              </div>
              
              <div className="col-span-2 text-center font-medium text-card-foreground opacity-60">
                {video.subCourse}
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                <Link 
                  href="/video/create?edit=true"
                  className="text-[#2D9CDB] hover:opacity-70 transition-opacity"
                  title="Edit Video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit size={18} />
                </Link>
                <button 
                  onClick={(e) => handleDelete(e, video)}
                  className="text-[#FF5A5F] hover:opacity-70 transition-opacity"
                  title="Delete Video"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 flex justify-between items-center text-sm text-card-foreground opacity-50 font-medium border-t border-border bg-card">
          <div className="flex items-center gap-3">
            Showing 
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page
                }}
                className="appearance-none flex items-center gap-2 border border-border rounded px-3 py-1.5 bg-background text-card-foreground cursor-pointer hover:bg-white/5 transition-colors pr-8 focus:outline-none"
              >
                <option className="bg-card" value={5}>5</option>
                <option className="bg-card" value={10}>10</option>
                <option className="bg-card" value={20}>20</option>
                <option className="bg-card" value={50}>50</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-card-foreground">
                <ChevronDown size={14} />
              </div>
            </div>
            of {data.length}
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === 1 || totalPages === 0 ? 'text-border cursor-not-allowed' : 'text-card-foreground hover:bg-white/5 cursor-pointer'}`}
            >
              <ChevronLeft size={16} />
            </button>
            
            {getPageNumbers().map(pageNum => (
              <button 
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded font-medium transition-colors cursor-pointer ${currentPage === pageNum ? 'bg-[#2D9CDB] text-white shadow-sm font-bold' : 'text-card-foreground opacity-60 hover:bg-white/5'}`}
              >
                {pageNum}
              </button>
            ))}
            
            {totalPages > 5 && currentPage + 2 < totalPages && (
               <>
                 <span className="px-1 text-gray-400">...</span>
                 <button 
                   onClick={() => handlePageChange(totalPages)}
                   className="w-8 h-8 flex items-center justify-center rounded text-card-foreground opacity-60 hover:bg-white/5 transition-colors cursor-pointer"
                 >
                   {totalPages}
                 </button>
               </>
            )}

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-border cursor-not-allowed' : 'text-card-foreground hover:bg-white/5 cursor-pointer'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-[#2D9CDB] flex items-center justify-center text-white">
                    <Video size={18} />
                 </div>
                 <h2 className="text-xl font-bold text-card-foreground">Video Context</h2>
              </div>
              <button onClick={closeModal} className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <div className="aspect-video rounded-2xl overflow-hidden bg-black relative group cursor-pointer shadow-lg">
                   <img 
                    src={`https://images.unsplash.com/photo-1492619334798-de41e2ee530a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80&sig=${selectedVideo.id}`} 
                    alt="Video Thumbnail" 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#2D9CDB] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                       <Play size={24} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-card-foreground mb-4 leading-tight">
                {selectedVideo.title}
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl border border-border bg-background/50">
                  <span className="text-[11px] font-bold text-card-foreground opacity-40 uppercase flex items-center gap-1.5 mb-1">
                    <Video size={12} className="text-[#2D9CDB]" /> Course Module
                  </span>
                  <span className="text-sm font-semibold text-card-foreground opacity-70">{selectedVideo.courseName}</span>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background/50">
                  <span className="text-[11px] font-bold text-card-foreground opacity-40 uppercase flex items-center gap-1.5 mb-1">
                    Total Views
                  </span>
                  <span className="text-sm font-semibold text-card-foreground opacity-70">{selectedVideo.view} Plays</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex-1 py-3 rounded-xl bg-[#2D9CDB] text-white font-bold hover:bg-[#1f87c5] transition-all flex items-center justify-center gap-2"
                >
                  Open in Course Player
                </button>
                <button 
                  onClick={(e) => handleDelete(e, selectedVideo)}
                  className="px-6 py-3 rounded-xl border border-[#FF5A5F] text-[#FF5A5F] font-bold hover:bg-red-500/5 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Delete
                </button>
                <button 
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl bg-border/20 text-card-foreground opacity-50 font-bold hover:bg-border/40 transition-all"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
        itemName={videoToDelete?.title}
      />
    </main>
  );
}
