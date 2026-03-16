"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Trash2, Edit, X, User, Mail, Shield, ShieldCheck, Settings } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';

const roles = ['Admin'];

// Generate mock data for pagination testing
const generateAuthors = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const roleIndex = i % roles.length;
    return {
      id: i + 1,
      name: `Md Hossain Firoz ${i + 1}`,
      email: `hoossen${i + 1}@gmail.com`,
      roll: 'Admin',
      canDelete: true
    };
  });
};

export default function AuthorPage() {
  const [data, setData] = useState(() => generateAuthors(45));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<any>(null);
  
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

  const handleRowClick = (author: any) => {
    setSelectedAuthor(author);
  };

  const closeModal = () => {
    setSelectedAuthor(null);
  };

  const handleDelete = (e: React.MouseEvent, author: any) => {
    e.stopPropagation();
    setAuthorToDelete(author);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (authorToDelete) {
      setData(prev => prev.filter(a => a.id !== authorToDelete.id));
      if (selectedAuthor?.id === authorToDelete.id) closeModal();
      // Adjust page if current item was the only one on page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setAuthorToDelete(null);
    }
  };

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-title transition-colors">Admin Management</h3>
        <div className="w-2 h-8 rounded-full bg-[#A37BCE]"></div>
      </div>
      
      <div className="list-container">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-4 pl-4 uppercase tracking-wider">NAME</div>
          <div className="col-span-4 uppercase tracking-wider">EMAIL</div>
          <div className="col-span-3 uppercase tracking-wider">ROLL</div>
          <div className="col-span-1 text-center uppercase tracking-wider">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.map((row, index) => (
            <div 
              key={row.id} 
              onClick={() => handleRowClick(row)}
              className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'list-row-even' : 'list-row-odd'}`}
            >
              <div className="col-span-4 pl-4 font-medium text-card-foreground flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-[#A37BCE]/10 flex items-center justify-center text-[#A37BCE]">
                    <User size={14} />
                 </div>
                 {row.name}
              </div>
              
              <div className="col-span-4 font-medium text-card-foreground opacity-60">
                {row.email}
              </div>
              
              <div className="col-span-3 font-medium text-card-foreground opacity-60">
                <span className={`px-2 py-1 rounded text-[11px] font-bold ${row.roll === 'Super Admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-border/40 text-card-foreground opacity-70'}`}>
                    {row.roll}
                </span>
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRowClick(row); }}
                  className="text-[#2D9CDB] hover:opacity-70 transition-opacity"
                  title="Edit Admin"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={(e) => handleDelete(e, row)}
                  className="text-[#FF5A5F] hover:opacity-70 transition-opacity"
                  title="Remove Admin"
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
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === totalPages || totalPages === 0 ? 'text-border cursor-not-allowed' : 'text-card-foreground opacity-60 hover:bg-white/5 cursor-pointer'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Author Detail Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-[#A37BCE] flex items-center justify-center text-white">
                    <ShieldCheck size={18} />
                 </div>
                 <h2 className="text-xl font-bold text-card-foreground">Admin Profile</h2>
              </div>
              <button onClick={closeModal} className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 rounded-full bg-[#A37BCE]/10 flex items-center justify-center text-[#A37BCE] mb-4 border-4 border-background shadow-md">
                   <User size={48} />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-1">{selectedAuthor.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedAuthor.roll === 'Super Admin' ? 'bg-purple-500/10 text-purple-500' : 'bg-border/40 text-card-foreground opacity-70'}`}>
                  {selectedAuthor.roll}
                </span>
              </div>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-card-foreground opacity-40 shadow-sm border border-border">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-card-foreground opacity-30 uppercase tracking-tight">Email Address</p>
                    <p className="text-sm font-semibold text-card-foreground opacity-70">{selectedAuthor.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-card-foreground opacity-40 shadow-sm border border-border">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-card-foreground opacity-30 uppercase tracking-tight">Access Level</p>
                    <p className="text-sm font-semibold text-card-foreground opacity-70">{selectedAuthor.roll} Privileges</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-card-foreground opacity-40 shadow-sm border border-border">
                    <Settings size={20} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-card-foreground opacity-30 uppercase tracking-tight">Account System ID</p>
                    <p className="text-sm font-semibold text-card-foreground opacity-70">ADM-{selectedAuthor.id.toString().padStart(3, '0')}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); }}
                  className="flex-1 py-3 rounded-xl bg-[#2D9CDB] text-white font-bold hover:bg-[#1f87c5] transition-all flex items-center justify-center gap-2"
                >
                  <Edit size={18} /> Update Access
                </button>
                {selectedAuthor.canDelete && (
                   <button 
                    onClick={(e) => handleDelete(e, selectedAuthor)}
                    className="px-6 py-3 rounded-xl border border-[#FF5A5F] text-[#FF5A5F] font-bold hover:bg-red-500/5 transition-all"
                  >
                    Delete
                  </button>
                )}
                <button 
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl bg-border/20 text-card-foreground opacity-50 font-bold hover:bg-border/40 transition-all"
                >
                  Close
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
        title="Remove Admin"
        message="Are you sure you want to remove this admin? This action cannot be undone."
        itemName={authorToDelete?.name}
      />
    </main>
  );
}
