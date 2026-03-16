"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Trash2, Edit, X, Mail, User, Calendar, Megaphone, Send } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Link from 'next/link';

const mockText = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,";

// Generate mock data for pagination testing
const generateNewsletters = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Newsletter Edition ${i + 1}: ${mockText.substring(0, 40)}...`,
    content: mockText + " " + mockText,
    view: `${Math.floor(Math.random() * 5) + 1} M +`,
    authorName: 'Samantha',
    date: '14 March 2024'
  }));
};

export default function NewsletterPage() {
  const [data, setData] = useState(() => generateNewsletters(45));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedNewsletter, setSelectedNewsletter] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newsletterToDelete, setNewsletterToDelete] = useState<any>(null);
  
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

  const handleRowClick = (item: any) => {
    setSelectedNewsletter(item);
  };

  const closeModal = () => {
    setSelectedNewsletter(null);
  };

  const handleDelete = (e: React.MouseEvent, newsletter: any) => {
    e.stopPropagation();
    setNewsletterToDelete(newsletter);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (newsletterToDelete) {
      setData(prev => prev.filter(n => n.id !== newsletterToDelete.id));
      if (selectedNewsletter?.id === newsletterToDelete.id) closeModal();
      // Adjust page if current item was the only one on page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setNewsletterToDelete(null);
    }
  };

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-title transition-colors">News Letter</h3>
        <Link href="/newsletter/create">
          <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors border-none cursor-pointer">
            Add News Letter
          </button>
        </Link>
      </div>
      
      <div className="list-container">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-6 pl-4 uppercase tracking-wider text-xs">NEWSLETTER TITTLE</div>
          <div className="col-span-2 text-center uppercase tracking-wider text-xs">AUTHOR</div>
          <div className="col-span-2 text-center uppercase tracking-wider text-xs">PREVIEW IMAGE</div>
          <div className="col-span-1 text-center uppercase tracking-wider text-xs">VIEW</div>
          <div className="col-span-1 text-center uppercase tracking-wider text-xs">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => handleRowClick(item)}
              className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'list-row-even' : 'list-row-odd'}`}
            >
              <div className="col-span-6 pl-4 pr-6 leading-relaxed text-card-foreground font-medium">
                {item.title}
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                  <img 
                    src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80&sig=${item.id}`} 
                    alt={item.authorName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm border border-border">
                  <img 
                    src={`https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&sig=${item.id + 200}`} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="col-span-1 text-center text-card-foreground opacity-60 font-medium">
                {item.view}
              </div>
              <div className="col-span-1 flex justify-center items-center gap-3">
                  <Link 
                    href={`/newsletter/${item.id}/edit`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-[#2D9CDB] transition-colors"
                    title="Edit Newsletter"
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={(e) => handleDelete(e, item)}
                    className="text-[#FF5A5F] hover:opacity-70 transition-opacity"
                    title="Delete Newsletter"
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
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-50 cursor-pointer'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedNewsletter && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50 shrink-0">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-[#2D9CDB]/10 flex items-center justify-center text-[#2D9CDB]">
                    <Megaphone size={20} />
                 </div>
                 <h2 className="text-xl font-bold text-card-foreground">Newsletter Preview</h2>
              </div>
              <button onClick={closeModal} className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-0 overflow-y-auto">
              <div className="w-full h-64 relative">
                 <img 
                    src={`https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80&sig=${selectedNewsletter.id + 200}`} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                     <p className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <Calendar size={14} /> Published on {selectedNewsletter.date}
                     </p>
                     <h3 className="text-2xl font-bold text-white text-shadow-sm">
                        {selectedNewsletter.title}
                     </h3>
                  </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-background shadow-sm">
                    <img 
                      src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80&sig=${selectedNewsletter.id}`} 
                      alt={selectedNewsletter.authorName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-card-foreground opacity-40 font-bold uppercase tracking-wider">Editor in Chief</span>
                    <p className="font-bold text-card-foreground leading-none">{selectedNewsletter.authorName}</p>
                  </div>
                </div>

                <div className="bg-background/50 p-6 rounded-2xl border border-border leading-relaxed text-card-foreground opacity-70">
                   <p className="mb-4">{selectedNewsletter.content}</p>
                   <p>This newsletter covers the latest trends in ed-tech and provides exclusive insights for our pro members. Stay tuned for more updates next week!</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-background/50 flex gap-3 shrink-0">
                <button 
                  className="flex-1 py-3 rounded-xl bg-[#2D9CDB] text-white font-bold hover:bg-[#1f87c5] transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send to Students
                </button>
                <button 
                  onClick={(e) => handleDelete(e, selectedNewsletter)}
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
      )}

      <DeleteConfirmation 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Newsletter"
        message="Are you sure you want to delete this newsletter? This action cannot be revoked."
        itemName={newsletterToDelete?.title}
      />
    </main>
  );
}
