import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Edit } from 'lucide-react';

const mockText = "There are many variations of passages of Lorem Ipsum available.";
const mockSubCourse = "printing, and typesetting, industry Lorem, Ipsum has";

const courseData = [
  { id: 1, text: mockText, subCourse: mockSubCourse, video: '200', status: 'Pro', review: '4.5' },
  { id: 2, text: mockText, subCourse: mockSubCourse, video: '200', status: 'Pro', review: '4.5' },
  { id: 3, text: mockText, subCourse: mockSubCourse, video: '200', status: 'Pro', review: '4.5' },
  { id: 4, text: mockText, subCourse: mockSubCourse, video: '200', status: 'Pro', review: '4.5' },
  { id: 5, text: mockText, subCourse: mockSubCourse, video: '200', status: 'Free', review: '4.5' },
  { id: 6, text: mockText, subCourse: mockSubCourse, video: '200', status: 'Free', review: '4.5' },
];

export default function CoursePage() {
  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#333333]">Course</h3>
        <button className="bg-[#2D9CDB] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1f87c5] transition-colors shadow-sm cursor-pointer">
          Add Course
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 p-4 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider items-center gap-4">
          <div className="col-span-3 pl-4">COURSE TITTLE</div>
          <div className="col-span-3">SUB COURSE</div>
          <div className="col-span-2 text-center">THUMBNAIL</div>
          <div className="col-span-1 text-center">VIDEO</div>
          <div className="col-span-1 text-center">STATUS</div>
          <div className="col-span-1 text-center">REVIEW</div>
          <div className="col-span-1 text-center">ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {courseData.map((course, index) => (
            <div 
              key={course.id} 
              className={`grid grid-cols-12 p-4 text-[13px] text-[#4F4F4F] items-center gap-4 ${index === 0 ? 'bg-[#E5E5E5]' : 'bg-white'}`}
            >
              <div className="col-span-3 pl-4 pr-2 font-medium leading-relaxed text-[#333333]">
                {course.text}
              </div>
              
              <div className="col-span-3 font-medium leading-relaxed text-[#555555]">
                {course.subCourse}
              </div>
              
              <div className="col-span-2 flex justify-center">
                <div className="w-14 h-14 rounded overflow-hidden shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                    alt="Thumbnail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="col-span-1 text-center font-semibold text-gray-700">
                {course.video}
              </div>
              
              <div className="col-span-1 text-center font-medium text-gray-700">
                {course.status}
              </div>
              
              <div className="col-span-1 text-center font-semibold text-[#2D9CDB] flex items-center justify-center gap-1">
                {course.review} <span>☆</span>
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
