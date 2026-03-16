"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Trash2, Edit, X, User, Calendar, Share2, MessageSquare } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Link from 'next/link';

const mockText = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,";

// Generate mock data for pagination testing
const generateBlogs = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Blog Post ${i + 1}: ${mockText.substring(0, 50)}...`,
    content: mockText + " " + mockText,
    hasAuthorImage: i % 3 !== 0,
    view: `${Math.floor(Math.random() * 5) + 1} M +`,
    authorName: i % 3 !== 0 ? 'Samantha' : 'Unknown',
    date: '14 March 2024',
    comments: [
      { id: 1, author: 'Alex Rivera', date: '2 hours ago', content: 'Great insights on the current market trends. Really enjoyed this article!' },
      { id: 2, author: 'Jordan Smith', date: '5 hours ago', content: 'Could you elaborate more on the technical implementation mentioned in section 2?' },
      { id: 3, author: 'Casey Chen', date: '1 day ago', content: 'This is exactly what I needed for my project. Thanks for sharing!' }
    ]
  }));
};

export default function BlogPage() {
  const [data, setData] = useState(() => generateBlogs(45));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const handleShare = (blog: any) => {
    const url = `${window.location.origin}/blog/${blog.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  
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

  const handleRowClick = (blog: any) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setShowComments(false);
  };

  const handleDelete = (e: React.MouseEvent, blog: any) => {
    e.stopPropagation();
    setBlogToDelete(blog);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      setData(prev => prev.filter(b => b.id !== blogToDelete.id));
      if (selectedBlog?.id === blogToDelete.id) closeModal();
      // Adjust page if current item was the only one on page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setBlogToDelete(null);
    }
  };

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-title transition-colors">Our Blog</h3>
        <Link href="/blog/create">
          <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors border-none cursor-pointer">
            Add New Blog
          </button>
        </Link>
      </div>
      
      <div className="list-container">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-6 pl-4">BLOG TITTLE</div>
          <div className="col-span-2 text-center">AUTHOR</div>
          <div className="col-span-2 text-center">FEATURE IMAGE</div>
          <div className="col-span-1 text-center">VIEW</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.map((blog, index) => (
            <div 
              key={blog.id} 
              onClick={() => handleRowClick(blog)}
              className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'list-row-even' : 'list-row-odd'}`}
            >
              <div className="col-span-6 pl-4 pr-6 leading-relaxed text-card-foreground font-medium">
                {blog.title}
              </div>
              
              <div className="col-span-2 flex justify-center">
                {blog.hasAuthorImage ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                    <img 
                      src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80&sig=${blog.id}`} 
                      alt={blog.authorName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-border/40 flex items-center justify-center text-card-foreground/50 text-xs">NA</div>
                )}
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="w-16 h-12 rounded-lg overflow-hidden shadow-sm border border-border">
                  <img 
                    src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80&sig=${blog.id + 100}`} 
                    alt="Blog Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="col-span-1 text-center text-card-foreground opacity-60 font-medium whitespace-nowrap">
                {blog.view}
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                  <Link 
                    href={`/blog/create?id=${blog.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-[#2D9CDB] transition-colors"
                    title="Edit Blog"
                  >
                    <Edit size={18} />
                  </Link>
                <button 
                  onClick={(e) => handleDelete(e, blog)}
                  className="text-[#FF5A5F] hover:text-[#e44e53] transition-colors"
                  title="Delete Blog"
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

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50 shrink-0">
              <h2 className="text-xl font-bold text-card-foreground">Blog Post Preview</h2>
              <button onClick={closeModal} className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-0 overflow-y-auto">
              <div className="w-full aspect-[21/9] relative">
                <img 
                  src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80&sig=${selectedBlog.id + 100}`} 
                  alt="Blog Cover" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                    {selectedBlog.title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/90 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} /> {selectedBlog.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {selectedBlog.view} Views
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-8 pb-8 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2D9CDB]">
                       <img 
                        src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80&sig=${selectedBlog.id}`} 
                        alt={selectedBlog.authorName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-card-foreground">{selectedBlog.authorName}</p>
                      <p className="text-xs text-card-foreground opacity-40 font-medium">Content Author</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button 
                        onClick={() => handleShare(selectedBlog)}
                        className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${isCopied ? 'bg-green-500 text-white' : 'bg-border/20 text-card-foreground opacity-60 hover:bg-[#2D9CDB] hover:text-white hover:opacity-100'}`}
                        title="Copy Link"
                      >
                         <Share2 size={18} />
                         {isCopied && <span className="text-xs font-bold">Copied!</span>}
                      </button>
                    </div>
                    <button 
                      onClick={() => setShowComments(!showComments)}
                      className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${showComments ? 'bg-[#2D9CDB] text-white' : 'bg-border/20 text-card-foreground opacity-60 hover:bg-[#2D9CDB] hover:text-white hover:opacity-100'}`}
                      title="View Comments"
                    >
                       <MessageSquare size={18} />
                       {showComments && <span className="text-xs font-bold">Comments Active</span>}
                    </button>
                  </div>
                </div>

                {showComments ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-card-foreground">Post Comments ({selectedBlog.comments.length})</h4>
                      <button 
                        onClick={() => setShowComments(false)}
                        className="text-xs text-[#2D9CDB] font-bold hover:underline"
                      >
                        Back to Content
                      </button>
                    </div>
                    {selectedBlog.comments.map((comment: any) => (
                      <div key={comment.id} className="p-4 rounded-xl bg-background/50 border border-border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-sm text-card-foreground">{comment.author}</span>
                          <span className="text-[10px] text-card-foreground opacity-40 uppercase tracking-wider">{comment.date}</span>
                        </div>
                        <p className="text-sm text-card-foreground opacity-70 leading-relaxed italic">
                          "{comment.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="prose prose-blue max-w-none text-card-foreground opacity-70 leading-relaxed">
                    <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-[#2D9CDB] first-letter:mr-3 first-letter:float-left">
                      {selectedBlog.content}
                    </p>
                    <p>
                      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-border flex gap-3 bg-card shrink-0">
               <Link 
                  href={`/blog/create?id=${selectedBlog.id}`}
                  className="flex-1 py-3 rounded-xl bg-[#2D9CDB] text-white font-bold hover:bg-[#1f87c5] transition-all text-center no-underline"
                >
                  Edit Blog Post
                </Link>
                <button 
                  onClick={(e) => handleDelete(e, selectedBlog)}
                  className="px-6 py-3 rounded-xl border border-[#FF5A5F] text-[#FF5A5F] font-bold hover:bg-red-500/5 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> Delete
                </button>
                <button 
                  onClick={closeModal}
                  className="px-6 py-3 rounded-xl bg-border/20 text-card-foreground opacity-50 font-bold hover:bg-border/40 transition-all"
                >
                  Close
                </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action is permanent."
        itemName={blogToDelete?.title}
      />
    </main>
  );
}
