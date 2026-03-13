import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Edit } from 'lucide-react';

const mockTitle = "There are many variations of passages of";
const mockCourseName = "printing, and typesetting, industry Lorem, Ipsum has";
const mockSubCourse = "typesetting";

const videoData = [
  { id: 1, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
  { id: 2, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
  { id: 3, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
  { id: 4, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
  { id: 5, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
  { id: 6, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
  { id: 7, title: mockTitle, courseName: mockCourseName, subCourse: mockSubCourse, view: '200', question: 'View' },
];

export default function VideoPage() {
  return (
    <main className="w-full">
      <Header />
      
      {/* Visual top border dividing lines for layout matching screenshot */}
      <div className="relative mb-6">
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-[#2D9CDB] opacity-30 z-0"></div>
        <div className="absolute top-0 bottom-0 left-[60%] border-l border-dashed border-[#2D9CDB] opacity-30 z-0"></div>
        <div className="relative z-10 flex justify-between items-center py-2 bg-[#F3F4F6]">
           <h3 className="text-xl font-bold text-[#333333]">Video</h3>
           <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors shadow-sm cursor-pointer">
             Add New Video
           </button>
        </div>
      </div>
      
      {/* Wrap table in blue border like screenshot */}
      <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(45,156,219,0.1)] border-2 border-[#2D9CDB] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 p-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider items-center gap-4">
          <div className="col-span-3 pl-4">VIDEO TITTLE</div>
          <div className="col-span-4">COURSE NAME</div>
          <div className="col-span-2">SUB COURSE</div>
          <div className="col-span-1 text-center">VIEW</div>
          <div className="col-span-1 text-center">QUESTION</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {videoData.map((video, index) => (
            <div 
              key={video.id} 
              className={`grid grid-cols-12 p-4 text-[13px] text-[#4F4F4F] items-center gap-4 ${index === 0 ? 'bg-[#E5E5E5]' : 'bg-white'}`}
            >
              <div className="col-span-3 pl-4 pr-2 font-medium leading-relaxed text-[#333333]">
                {video.title}
              </div>
              
              <div className="col-span-4 font-medium leading-relaxed text-[#555555]">
                {video.courseName}
              </div>
              
              <div className="col-span-2 font-medium text-[#555555]">
                {video.subCourse}
              </div>
              
              <div className="col-span-1 text-center font-semibold text-gray-700">
                {video.view}
              </div>
              
              <div className="col-span-1 text-center font-medium text-gray-700 cursor-pointer hover:text-[#2D9CDB]">
                {video.question}
              </div>
              
              <div className="col-span-1 flex justify-center items-center gap-3">
                <button className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Eye size={16} />
                </button>
                <button className="text-[#2D9CDB] hover:text-[#1f87c5] transition-colors">
                  <Edit size={16} />
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
