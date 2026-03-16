"use client";

import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this?",
  itemName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4 animate-in fade-in duration-200">
      <div 
        className="bg-card rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 pr-2 flex justify-end">
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-background hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-8 pb-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-[#FF5A5F] mb-6 shadow-inner">
            <AlertTriangle size={36} />
          </div>
          
          <h3 className="text-2xl font-black text-title mb-3 tracking-tight">{title}</h3>
          
          <p className="text-sm text-card-foreground opacity-60 mb-2 leading-relaxed font-medium">
            {message}
          </p>
          {itemName && (
            <p className="text-sm font-bold text-[#FF5A5F] mb-8 bg-[#FF5A5F]/5 py-2 px-4 rounded-xl border border-[#FF5A5F]/10 truncate w-full">
              {itemName}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={onClose}
              className="py-4 px-6 rounded-2xl bg-background border border-border text-card-foreground font-black hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all text-xs uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="py-4 px-6 rounded-2xl bg-[#FF5A5F] text-white font-black hover:bg-[#e44e53] hover:shadow-lg hover:shadow-red-500/20 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
