import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SummaryCardProps {
  number: string;
  label: string;
}

const SummaryCard = ({ number, label }: SummaryCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <h3 className="text-4xl font-bold text-[#333333] mb-4">{number}</h3>
      <div className="flex justify-between items-center text-gray-500 font-medium">
        <span className="text-lg">{label}</span>
        <ArrowRight className="text-[#2D9CDB] cursor-pointer hover:translate-x-1 transition-transform" size={20} />
      </div>
    </div>
  );
};

export default SummaryCard;
