"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Edit, Trash2, X, User, Phone, Shield, Package, Activity } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';

// Generate more robust mock data for pagination testing
const generateStudents = (count: number) => {
  const types = ['Free', 'Paid'];
  const actionsPaid = ['Block', 'Unlock'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const action = type === 'Paid' ? actionsPaid[Math.floor(Math.random() * actionsPaid.length)] : 'Block';
    
    return {
      id: i + 1,
      name: `Student Name ${i + 1}`,
      mobile: `01722${Math.floor(100000 + Math.random() * 900000)}`,
      gender: i % 2 === 0 ? 'male' : 'female',
      type: type,
      package: '20-12-2023 / 6M',
      action: action
    };
  });
};

export default function StudentsPage() {
  const [data, setData] = useState(() => generateStudents(45));
  const [filterType, setFilterType] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);

  // Filter logic
  const filteredStudents = data.filter(student => {
    if (filterType === 'All') return true;
    return student.type === filterType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleRowClick = (student: any) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  const handleDelete = (e: React.MouseEvent, student: any) => {
    e.stopPropagation();
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      setData(prev => prev.filter(s => s.id !== studentToDelete.id));
      if (selectedStudent?.id === studentToDelete.id) closeModal();
      // Adjust page if current item was the only one on page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setStudentToDelete(null);
    }
  };

  const handleAction = (e: React.MouseEvent, student: any) => {
    e.stopPropagation();
    const newAction = student.action === 'Block' ? 'Unlock' : 'Block';
    setData(prev => prev.map(s => s.id === student.id ? { ...s, action: newAction } : s));
    if (selectedStudent?.id === student.id) {
        setSelectedStudent({ ...selectedStudent, action: newAction });
    }
  };

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-title transition-colors">Our Students</h3>
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 border border-[#FF5A5F] text-card-foreground px-4 py-1.5 rounded-full text-sm font-medium bg-card hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            {filterType === 'All' ? 'Filter' : filterType} 
            <span className="text-[#FF5A5F]"><ChevronDown size={16} /></span>
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-card rounded-lg shadow-lg border border-border z-10 py-1">
              {['All', 'Free', 'Paid'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setCurrentPage(1); // Reset to first page on filter
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${filterType === type ? 'text-[#FF5A5F] font-semibold' : 'text-card-foreground opacity-70'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="list-container">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-3 pl-4">STUDENTS NAME</div>
          <div className="col-span-2">MOBILE NUMBER</div>
          <div className="col-span-1">GENDER</div>
          <div className="col-span-2">STUDENTS TYPE</div>
          <div className="col-span-2">LAST PAY - PACKAGE</div>
          <div className="col-span-2 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.length > 0 ? (
            currentItems.map((student, index) => (
              <div 
                key={student.id} 
                onClick={() => handleRowClick(student)}
                className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${index % 2 !== 0 ? 'list-row-even' : 'list-row-odd'}`}
              >
                <div className="col-span-3 pl-4 font-medium text-card-foreground flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center text-card-foreground/60">
                      <User size={14} />
                   </div>
                   {student.name}
                </div>
                <div className="col-span-2 text-card-foreground opacity-60">{student.mobile}</div>
                <div className="col-span-1 text-card-foreground opacity-60 capitalize">{student.gender}</div>
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${student.type === 'Paid' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {student.type}
                  </span>
                </div>
                <div className="col-span-2 text-card-foreground opacity-60">{student.package}</div>
                <div className="col-span-2 flex justify-center items-center gap-3">
                  <button 
                    onClick={(e) => handleDelete(e, student)}
                    className="text-[#FF5A5F] hover:text-[#e44e53] transition-colors"
                    title="Delete Student"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button 
                    onClick={(e) => handleAction(e, student)}
                    className={`text-[11px] font-bold px-2 py-1 rounded border transition-colors ${student.action === 'Block' ? 'text-red-500 border-red-500/20 hover:bg-red-500/10' : 'text-green-500 border-green-500/20 hover:bg-green-500/10'}`}
                  >
                    {student.action}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-card-foreground opacity-40">
              No students found matching the selected filter.
            </div>
          )}
        </div>
        
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
            of {filteredStudents.length}
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

      {/* Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-border">
            <div className="p-6 border-b border-border flex justify-between items-center bg-background/50">
              <h2 className="text-xl font-bold text-card-foreground">Student Bio</h2>
              <button onClick={closeModal} className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-2xl bg-border/20 flex items-center justify-center text-[#2D9CDB]">
                  <User size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-1">{selectedStudent.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${selectedStudent.type === 'Paid' ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}`}>
                      {selectedStudent.type} Student
                    </span>
                    <span className="text-sm text-card-foreground opacity-40 capitalize">• {selectedStudent.gender}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border bg-background/30">
                  <span className="text-[11px] font-bold text-card-foreground opacity-40 uppercase tracking-tight flex items-center gap-1.5">
                    <Phone size={12} className="text-[#2D9CDB]" /> Mobile Number
                  </span>
                  <span className="text-sm font-semibold text-card-foreground">{selectedStudent.mobile}</span>
                </div>
                
                <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border bg-background/30">
                  <span className="text-[11px] font-bold text-card-foreground opacity-40 uppercase tracking-tight flex items-center gap-1.5">
                    <Package size={12} className="text-[#2D9CDB]" /> Current Package
                  </span>
                  <span className="text-sm font-semibold text-card-foreground">{selectedStudent.package}</span>
                </div>
                
                <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border bg-background/30">
                  <span className="text-[11px] font-bold text-card-foreground opacity-40 uppercase tracking-tight flex items-center gap-1.5">
                    <Shield size={12} className="text-[#2D9CDB]" /> Security Status
                  </span>
                  <span className={`text-sm font-bold ${selectedStudent.action === 'Block' ? 'text-green-500' : 'text-red-500'}`}>
                    {selectedStudent.action === 'Block' ? 'Active Account' : 'Blocked Account'}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-border bg-background/30">
                  <span className="text-[11px] font-bold text-card-foreground opacity-40 uppercase tracking-tight flex items-center gap-1.5">
                    <Activity size={12} className="text-[#2D9CDB]" /> Activity ID
                  </span>
                  <span className="text-sm font-semibold text-card-foreground">STU-{selectedStudent.id.toString().padStart(4, '0')}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={(e) => handleAction(e, selectedStudent)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all shadow-sm ${selectedStudent.action === 'Block' ? 'bg-[#FF5A5F] text-white hover:bg-[#e44e53]' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  {selectedStudent.action === 'Block' ? 'Block Student' : 'Unlock Student'}
                </button>
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
        title="Delete Student"
        message="Are you sure you want to delete this student? All record for this student will be removed."
        itemName={studentToDelete?.name}
      />
    </main>
  );
}
