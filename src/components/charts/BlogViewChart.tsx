"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const data = [
  { name: 'Sun', views: 60, isHighlight: false },
  { name: 'Sun', views: 80, isHighlight: true },
  { name: 'Sun', views: 40, isHighlight: false },
  { name: 'Sun', views: 68, isHighlight: true },
  { name: 'Sun', views: 60, isHighlight: false },
  { name: 'Sun', views: 25, isHighlight: true },
  { name: 'Sun', views: 60, isHighlight: false },
];

const BlogViewChart = () => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border h-[350px] flex flex-col w-full transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-card-foreground font-bold text-lg transition-colors">Blog View</h3>
        <select className="bg-background text-sm font-medium border border-border text-card-foreground rounded-md px-3 py-1 outline-none transition-colors">
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: -25, bottom: 0 }}
            barSize={12}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-zinc-900" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9CA3AF', fontSize: 11}} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9CA3AF', fontSize: 11}} 
              ticks={[0, 20, 40, 60, 80]}
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="views" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isHighlight ? '#F2C94C' : '#2D9CDB'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BlogViewChart;
