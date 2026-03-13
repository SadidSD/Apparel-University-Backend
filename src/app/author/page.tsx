import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react';

const authorData = [
  { id: 1, name: 'Md Hossain Firoz', email: 'Hoossen@gmail.com', roll: 'Super Admin', canDelete: false },
  { id: 2, name: 'Md Hossain Firoz', email: 'Hoossen@gmail.com', roll: 'Admin', canDelete: true },
  { id: 3, name: 'Md Hossain Firoz', email: 'Hoossen@gmail.com', roll: 'Sub Admin', canDelete: true },
  { id: 4, name: 'Md Hossain Firoz', email: 'Hoossen@gmail.com', roll: 'Support Admin', canDelete: true },
];

export default function AuthorPage() {
  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#333333]">Contract Form</h3>
        {/* Same purple tab from the design */}
        <div className="w-2 h-8 rounded-full bg-[#A37BCE]"></div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 p-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider items-center gap-4">
          <div className="col-span-4 pl-4">NAME</div>
          <div className="col-span-4">EMAIL</div>
          <div className="col-span-3">ROLL</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {authorData.map((row, index) => (
            <div 
              key={row.id} 
              className={`grid grid-cols-12 p-4 text-[13px] text-[#4F4F4F] items-center gap-4 ${index === 0 ? 'bg-[#E5E5E5]' : 'bg-white'}`}
            >
              <div className="col-span-4 pl-4 font-medium text-[#333333]">
                {row.name}
              </div>
              
              <div className="col-span-4 font-medium text-[#555555]">
                {row.email}
              </div>
              
              <div className="col-span-3 font-medium text-[#555555]">
                {row.roll}
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Eye size={16} />
                </button>
                {row.canDelete && (
                  <button className="text-[#FF5A5F] hover:text-[#e44e53] transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 flex justify-between items-center text-sm text-gray-400 font-medium border-t border-gray-100">
          <div className="flex items-center gap-3">
            Showing 
            <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 bg-gray-50 text-gray-700 cursor-pointer hover:bg-white transition-colors">
              10 <ChevronDown size={14} />
            </div>
            of 50
          </div>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2D9CDB] text-white font-bold shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors">5</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </main>
  );
}
