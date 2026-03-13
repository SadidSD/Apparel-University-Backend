import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Trash2, Edit } from 'lucide-react';

const mockText = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,";

const newsletterData = [
  { id: 1, text: mockText, view: '1 M +', authorName: 'Samantha' },
  { id: 2, text: mockText, view: '1 M +', authorName: 'Samantha' },
  { id: 3, text: mockText, view: '1 M +', authorName: 'Samantha' },
  { id: 4, text: mockText, view: '1 M +', authorName: 'Samantha' },
  { id: 5, text: mockText, view: '1 M +', authorName: 'Samantha' },
  { id: 6, text: mockText, view: '1 M +', authorName: 'Samantha' },
];

export default function NewsletterPage() {
  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#333333]">News Letter</h3>
        <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors">
          Add News Letter
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 p-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider items-center gap-4">
          <div className="col-span-6 pl-4">BLOG TITTLE</div>
          <div className="col-span-2 text-center">AUTHOR</div>
          <div className="col-span-2 text-center">FISSURE IMAGE</div>
          <div className="col-span-1 text-center">VIEW</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {newsletterData.map((item, index) => (
            <div 
              key={item.id} 
              className={`grid grid-cols-12 p-4 text-sm text-[#4F4F4F] items-center gap-4 ${index === 0 ? 'bg-[#E5E5E5]' : 'bg-white'}`}
            >
              <div className="col-span-6 pl-4 pr-6 leading-relaxed text-[#333333]">
                {item.text}
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt={item.authorName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="w-16 h-16 rounded overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="col-span-1 text-center text-gray-600 font-medium">
                {item.view}
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Eye size={18} />
                </button>
                <button className="text-[#FF5A5F] hover:text-[#e44e53] transition-colors">
                  <Trash2 size={18} />
                </button>
                <button className="text-[#2D9CDB] hover:text-[#1f87c5] transition-colors">
                  <Edit size={18} />
                </button>
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
