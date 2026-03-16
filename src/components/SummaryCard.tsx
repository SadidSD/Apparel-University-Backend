import React from 'react';
import { ArrowRight, Users } from 'lucide-react';

interface SummaryCardProps {
  number: string;
  label: string;
}

const SummaryCard = ({ number, label }: SummaryCardProps) => {
  return (
    <div className="bg-card p-8 rounded-2xl shadow-[0_5px_20px_-5px_rgba(0,0,0,0.05)] border border-border flex items-center gap-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-[#E3F2FD] dark:bg-zinc-900 flex items-center justify-center text-[#2D9CDB] group-hover:scale-110 transition-transform">
        <Users size={32} />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-card-foreground mb-1 transition-colors">{number}</h3>
        <p className="text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wider text-xs transition-colors">{label}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
