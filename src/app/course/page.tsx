"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, X, BookOpen, Star, Video, Layout } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Link from 'next/link';

const mockText = "There are many variations of passages of Lorem Ipsum available.";
const mockSubCourse = "printing, and typesetting, industry Lorem, Ipsum has";

// Generate mock data for pagination testing
const generateCourses = (count: number) => {
  const categories = ['Development', 'Design', 'Marketing', 'Business'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Course Title ${i + 1}: Mastering Modern Development Patterns`,
    subCourse: "Professional training for modern developers and engineers.",
    video: '200',
    status: i % 5 === 0 ? 'Free' : 'Pro',
    rating: (Math.random() * (5 - 3) + 3).toFixed(1),
    category: categories[i % categories.length]
  }));
};

export default function CoursePage() {
  const [data, setData] = useState(() => generateCourses(45));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [filterType, setFilterType] = useState<'All' | 'Free' | 'Pro'>('All');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<any>(null);
  
  // Filter data based on selected type
  const filteredData = data.filter(course => {
    if (filterType === 'All') return true;
    return course.status === filterType;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleRowClick = (course: any) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const handleDelete = (e: React.MouseEvent, course: any) => {
    e.stopPropagation();
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      setData(prev => prev.filter(c => c.id !== courseToDelete.id));
      if (selectedCourse?.id === courseToDelete.id) closeModal();
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setCourseToDelete(null);
    }
  };

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <h3 className="text-xl font-bold text-title transition-colors">Course</h3>
          
          <div className="flex bg-card border border-border p-1 rounded-xl">
             <button 
               onClick={() => { setFilterType('All'); setCurrentPage(1); }}
               className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === 'All' ? 'bg-[#2D9CDB] text-white shadow-sm' : 'text-card-foreground opacity-50 hover:bg-white/5'}`}
             >
                All
             </button>
             <button 
               onClick={() => { setFilterType('Free'); setCurrentPage(1); }}
               className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === 'Free' ? 'bg-[#2D9CDB] text-white shadow-sm' : 'text-card-foreground opacity-50 hover:bg-white/5'}`}
             >
                Free
             </button>
             <button 
               onClick={() => { setFilterType('Pro'); setCurrentPage(1); }}
               className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filterType === 'Pro' ? 'bg-[#2D9CDB] text-white shadow-sm' : 'text-card-foreground opacity-50 hover:bg-white/5'}`}
             >
                Paid
             </button>
          </div>
        </div>
        
        <Link href="/course/create">
          <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors shadow-sm cursor-pointer border-none">
            Add Course
          </button>
        </Link>
      </div>
      
      <div className="list-container">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-1 pl-4">ID</div>
          <div className="col-span-5">COURSE NAME</div>
          <div className="col-span-2 text-center">RATING</div>
          <div className="col-span-2 text-center">CATEGORY</div>
          <div className="col-span-2 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.length > 0 ? (
            currentItems.map((course, index) => (
              <div 
                key={course.id} 
                onClick={() => handleRowClick(course)}
                className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'list-row-even' : 'list-row-odd'}`}
              >
                <div className="col-span-1 pl-4 font-bold text-card-foreground/40 italic">
                  #{course.id.toString().padStart(2, '0')}
                </div>
                <div className="col-span-5 font-medium text-card-foreground flex items-center gap-3">
                   <div className="w-12 h-8 rounded bg-border overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80&sig=${course.id}`} 
                        alt="Course Thumb"
                        className="w-full h-full object-cover"
                      />
                   </div>
                   <span className="truncate">{course.name}</span>
                </div>
                <div className="col-span-2 flex justify-center items-center gap-1.5">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(parseFloat(course.rating)) ? "text-yellow-500" : "text-border"}>★</span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-card-foreground opacity-60">({course.rating})</span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-border/40 text-card-foreground opacity-70">
                    {course.category}
                  </span>
                </div>
                <div className="col-span-2 flex justify-center items-center gap-3">
                  <Link 
                    href={`/course/${course.id}/edit`}
                    className="text-[#2D9CDB] hover:opacity-70 transition-opacity"
                    title="Edit Course"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={(e) => handleDelete(e, course)}
                    className="text-[#FF5A5F] hover:opacity-70 transition-opacity"
                    title="Delete Course"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-card-foreground opacity-40">
              No courses found for this category.
            </div>
          )}
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 flex justify-between items-center text-sm text-card-foreground opacity-50 font-medium border-t border-border bg-card">
          <div className="flex items-center gap-3">
            Showing {currentItems.length} of {filteredData.length}
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

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <h2 className="text-xl font-bold text-card-foreground">Course Preview</h2>
              <button onClick={closeModal} className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="aspect-video rounded-xl overflow-hidden bg-border mb-6">
                <img 
                  src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&sig=${selectedCourse.id}`} 
                  alt="Course Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(parseFloat(selectedCourse.rating)) ? "text-yellow-500" : "text-border"}>★</span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-card-foreground opacity-60">({selectedCourse.rating} / 5.0)</span>
                </div>
                
                <h3 className="text-2xl font-bold text-card-foreground leading-tight">{selectedCourse.name}</h3>
                
                <div className="flex flex-wrap gap-2">
                   <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold">{selectedCourse.category}</span>
                   <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-bold">Best Seller</span>
                   <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-bold">Lifetime Access</span>
                </div>

                <div className="p-4 rounded-xl bg-background/50 border border-border">
                  <p className="text-sm text-card-foreground opacity-70 leading-relaxed italic">
                    "This course provides a comprehensive guide to mastering {selectedCourse.category} with real-world projects and expert mentorship."
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                 <Link 
                  href={`/course/${selectedCourse.id}`}
                  className="flex-1 py-3 rounded-xl bg-[#2D9CDB] text-white font-bold hover:bg-[#1f87c5] transition-all text-center no-underline"
                 >
                   View Dashboard
                 </Link>
                 <button 
                  onClick={closeModal}
                  className="px-8 py-3 rounded-xl font-bold text-card-foreground opacity-50 bg-border/20 hover:bg-border/40 transition-all"
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
        title="Delete Course"
        message="Are you sure you want to delete this course? This action will permanently remove it from the system."
        itemName={courseToDelete?.name}
      />
    </main>
  );
}
