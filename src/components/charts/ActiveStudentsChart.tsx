"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceDot
} from 'recharts';

const data = [
  { name: 'Sunday', students: 10 },
  { name: 'Monday', students: 30 },
  { name: 'Tuesday', students: 12 },
  { name: 'Wednesday', students: 45 },
  { name: 'Thursday', students: 25 },
  { name: 'Friday', students: 40 },
  { name: 'Saturday', students: 20 },
];

const ActiveStudentsChart = () => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border h-[350px] flex flex-col relative w-full transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-card-foreground font-bold text-lg transition-colors">Active Students</h3>
        <select className="bg-background border text-sm font-medium border-border text-card-foreground rounded-md px-3 py-1 outline-none transition-colors">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D9CDB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2D9CDB" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9CA3AF', fontSize: 11}} 
              dy={10}
            />
            <Tooltip 
               cursor={false}
               contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="students" 
              stroke="#2D9CDB" 
              fillOpacity={1} 
              fill="url(#colorStudents)" 
              strokeWidth={3}
            />
            {/* Mock highlight for Wednesday */}
            <ReferenceDot x="Wednesday" y={45} r={6} fill="#2D9CDB" stroke="white" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Floating manual tooltip to match screenshot precisely */}
        <div className="absolute top-[40%] left-[45%] -translate-x-1/2 bg-card px-4 py-2 rounded-lg shadow-md border border-border flex flex-col items-center transition-colors">
          <span className="font-bold text-card-foreground text-sm transition-colors">456 <span className="font-normal text-gray-500 dark:text-zinc-500 text-xs transition-colors">Order</span></span>
          <span className="text-gray-400 dark:text-zinc-500 text-[10px] transition-colors">Oct 18th, 2020</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveStudentsChart;
