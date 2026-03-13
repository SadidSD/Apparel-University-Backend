import Header from '@/components/Header';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const studentsData = [
  { id: 1, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Free', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 2, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Unlock' },
  { id: 3, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 4, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 5, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 6, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 7, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 8, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 9, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
  { id: 10, name: 'Enamul hossen Firoz', mobile: '01722924089', gender: 'male', type: 'Paid', package: '20-20-2022 / 6M', action: 'Block' },
];

export default function StudentsPage() {
  return (
    <main className="w-full">
      <Header />
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#333333]">Our Students</h3>
        <button className="flex items-center gap-2 border border-[#FF5A5F] text-[#4F4F4F] px-4 py-1.5 rounded-full text-sm font-medium bg-white">
          Free <span className="text-[#FF5A5F]"><ChevronDown size={16} /></span>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 p-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="pl-4">STUDENTS NAME</div>
          <div>MOBILE NUMBER</div>
          <div>GENDER</div>
          <div>STUDENTS TYPE</div>
          <div>LAST PAY - PACKAGE</div>
          <div>ACTION</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-gray-50">
          {studentsData.map((student, index) => (
            <div 
              key={student.id} 
              className={`grid grid-cols-6 p-4 text-sm text-[#4F4F4F] ${index === 0 ? 'bg-[#F3F4F6]' : 'bg-white'}`}
            >
              <div className="pl-4">{student.name}</div>
              <div className="text-gray-500">{student.mobile}</div>
              <div className="text-gray-500">{student.gender}</div>
              <div className="text-gray-500">{student.type}</div>
              <div className="text-gray-500">{student.package}</div>
              <div className="cursor-pointer font-medium hover:text-[#2D9CDB] transition-colors">{student.action}</div>
            </div>
          ))}
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 flex justify-between items-center text-sm text-gray-400 font-medium border-t border-gray-100">
          <div className="flex items-center gap-3">
            Showing 
            <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 bg-gray-50 text-gray-700 cursor-pointer">
              10 <ChevronDown size={14} />
            </div>
            of 50
          </div>
          
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 hover:bg-gray-50 transition-colors"><ChevronLeft size={16} /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#2D9CDB] text-white font-bold transition-colors">1</button>
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
