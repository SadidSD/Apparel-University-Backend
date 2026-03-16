"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, User, Edit3, LogIn, Settings, X, Trash2 } from 'lucide-react';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import Link from 'next/link';

// Helper to generate mock data
const generateMockData = (count: number) => {
  const users = [
    { name: 'Samantha Doe', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Alex Smith', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'James Brown', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
  ];
  
  const actions = [
    { text: 'Logged in', type: 'login', target: 'System', status: 'Success' },
    { text: 'Edited Course', type: 'edit', target: 'Introduction to React', status: 'Completed' },
    { text: 'Updated Profile', type: 'edit', target: 'Author Settings', status: 'Completed' },
    { text: 'Deleted Video', type: 'delete', target: 'React Basics Pt. 1', status: 'Warning' },
    { text: 'Created Course', type: 'create', target: 'Advanced Next.js', status: 'Success' },
  ];

  return Array.from({ length: count }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    // Make the first few unread
    const isRead = i > 4;
    
    return {
      id: i + 1,
      user: user.name,
      avatar: user.avatar,
      action: action.text,
      target: action.target,
      time: `${Math.floor(Math.random() * 24) + 1} hours ago`,
      type: action.type,
      status: action.status,
      isRead: isRead
    };
  });
};

const initialNotifications = generateMockData(45);

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<any>(null);

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  
  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notifications.slice(indexOfFirstItem, indexOfLastItem);

  const getIconForType = (type: string) => {
    switch(type) {
      case 'login': return <LogIn size={16} className="text-green-500" />;
      case 'edit': return <Edit3 size={16} className="text-blue-500" />;
      case 'delete': return <Settings size={16} className="text-red-500" />;
      case 'create': return <Settings size={16} className="text-purple-500" />;
      default: return <User size={16} className="text-gray-500" />;
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: any) => {
    // Mark as read when clicked
    if (!notification.isRead) {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, isRead: true } : n
      ));
    }
    setSelectedNotification(notification);
  };

  const closeModal = () => setSelectedNotification(null);
  
  const handleDelete = (e: React.MouseEvent, notification: any) => {
    e.stopPropagation();
    setNotificationToDelete(notification);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (notificationToDelete) {
      setNotifications(prev => prev.filter(n => n.id !== notificationToDelete.id));
      if (selectedNotification?.id === notificationToDelete.id) closeModal();
      // Adjust page if current item was the only one on page
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setNotificationToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    // Show max 5 page numbers
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

  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-title transition-colors">Notifications & Activity</h3>
          <p className="text-sm text-card-foreground opacity-50 mt-1">Track system logins, document edits, and general activity</p>
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          className="bg-card border border-border text-card-foreground opacity-70 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors shadow-sm cursor-pointer"
        >
          Mark all as read
        </button>
      </div>
      
      <div className="list-container">
        {/* Table Header */}
        <div className="list-header grid grid-cols-12 gap-4">
          <div className="col-span-3 pl-4 uppercase tracking-wider">USER</div>
          <div className="col-span-3 uppercase tracking-wider">ACTION</div>
          <div className="col-span-3 text-left uppercase tracking-wider">TARGET</div>
          <div className="col-span-2 text-center uppercase tracking-wider">DATE/TIME</div>
          <div className="col-span-1 text-center uppercase tracking-wider">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="list-content divide-y divide-border">
          {currentItems.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => handleNotificationClick(item)}
              className={`grid grid-cols-12 p-4 text-sm items-center gap-4 cursor-pointer relative ${!item.isRead ? 'bg-[#2D9CDB]/5 dark:bg-[#2D9CDB]/10' : (index % 2 !== 0 ? 'list-row-even' : 'list-row-odd')} hover:bg-black/5 dark:hover:bg-white/5 transition-colors`}
            >
              {!item.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D9CDB]" />}
              <div className="col-span-3 pl-4 pr-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-border shrink-0">
                  <img src={item.avatar} alt={item.user} className="w-full h-full object-cover" />
                </div>
                <span className={`font-semibold ${!item.isRead ? 'text-card-foreground' : 'text-card-foreground opacity-70'}`}>{item.user}</span>
              </div>
              
              <div className="col-span-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-border/20 flex items-center justify-center shrink-0">
                  {getIconForType(item.type)}
                </div>
                <span className={`font-medium ${!item.isRead ? 'text-card-foreground' : 'text-card-foreground opacity-60'}`}>
                  {item.action}
                </span>
              </div>
              
              <div className="col-span-3 text-left font-medium text-card-foreground opacity-50 truncate pr-4">
                {item.target}
              </div>
              
              <div className="col-span-2 text-center text-xs font-bold text-card-foreground opacity-40 uppercase">
                {item.time}
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                <button 
                  onClick={(e) => handleDelete(e, item)}
                  className="text-[#FF5A5F] hover:opacity-70 transition-opacity"
                  title="Delete Notification"
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
            of {notifications.length}
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === 1 ? 'text-border cursor-not-allowed' : 'text-card-foreground hover:bg-white/5 cursor-pointer'}`}
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
            
            {/* Show ellipsis if there are more pages */}
            {totalPages > 5 && currentPage + 2 < totalPages && (
               <>
                 <span className="px-1 text-card-foreground opacity-30">...</span>
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
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${currentPage === totalPages ? 'text-border cursor-not-allowed' : 'text-card-foreground hover:bg-white/5 cursor-pointer'}`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {selectedNotification && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border">
            {/* Modal Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-border bg-background/50">
              <h3 className="font-bold text-card-foreground text-lg">Notification Details</h3>
              <button 
                onClick={closeModal}
                className="text-card-foreground opacity-40 hover:opacity-100 transition-opacity p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border/50 shrink-0">
                  <img src={selectedNotification.avatar} alt={selectedNotification.user} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-card-foreground text-lg">{selectedNotification.user}</h4>
                  <p className="text-card-foreground opacity-40 text-sm mt-0.5">{selectedNotification.time}</p>
                </div>
              </div>
              
              <div className="bg-background/50 rounded-xl p-5 border border-border mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-md bg-card border border-border shadow-sm flex items-center justify-center">
                    {getIconForType(selectedNotification.type)}
                  </div>
                  <span className="font-semibold text-card-foreground text-base">
                    {selectedNotification.action}
                  </span>
                </div>
                
                <div className="pl-11">
                  <p className="text-card-foreground opacity-40 text-sm mb-1">Target Resource:</p>
                  <p className="font-medium text-card-foreground opacity-70">{selectedNotification.target}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-card-foreground opacity-30 uppercase tracking-wider">Status</span>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  selectedNotification.status === 'Success' ? 'bg-green-500/10 text-green-500' :
                  selectedNotification.status === 'Completed' ? 'bg-blue-500/10 text-blue-500' :
                  selectedNotification.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' :
                  'bg-border/40 text-card-foreground opacity-70'
                }`}>
                  {selectedNotification.status}
                </span>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-background/50 border-t border-border flex justify-end">
              <button 
                onClick={closeModal}
                className="bg-[#2D9CDB] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#1f87c5] transition-colors shadow-sm"
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
        title="Delete Notification"
        message="Are you sure you want to delete this notification from your log?"
        itemName={notificationToDelete ? `${notificationToDelete.user}: ${notificationToDelete.action}` : undefined}
      />
    </main>
  );
}
