"use client";

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine
} from 'recharts';

const data = [
  { name: 'Jan', y2020: 10, y2021: 22 },
  { name: 'Feb', y2020: 17, y2021: 30 },
  { name: 'Mar', y2020: 18, y2021: 12 },
  { name: 'Apr', y2020: 20, y2021: 27 },
  { name: 'May', y2020: 26, y2021: 36 },
  { name: 'Jun', y2020: 34, y2021: 21 },
  { name: 'Jul', y2020: 38, y2021: 29 },
  { name: 'Aug', y2020: 25, y2021: 36 },
  { name: 'Sept', y2020: 18, y2021: 33 },
  { name: 'Oct', y2020: 20, y2021: 18 },
  { name: 'Nov', y2020: 24, y2021: 32 },
  { name: 'Des', y2020: 23, y2021: 33 }, // 'Des' instead of 'Dec' as in image
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#E3F2FD] text-[#2D9CDB] px-3 py-1 rounded-md shadow-sm font-semibold text-xs border border-[#2D9CDB]/20">
        $ {payload[0].value.toFixed(2).replace('.', ',')}
      </div>
    );
  }
  return null;
};

const UpdatePackageChart = () => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-border h-[400px] flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-card-foreground font-bold text-xl transition-colors">Update Package</h3>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-400 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2D9CDB]"></span>
            2020
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5A5F]"></span>
            2021
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} stroke="#f0f0f0" className="dark:stroke-zinc-900" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9CA3AF', fontSize: 12}} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#9CA3AF', fontSize: 12}} 
              ticks={[10, 20, 30, 40]}
              tickFormatter={(value) => `${value}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            
            <Line 
              type="monotone" 
              dataKey="y2020" 
              stroke="#2D9CDB" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: "#2D9CDB", stroke: "white", strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="y2021" 
              stroke="#FF5A5F" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: "#FF5A5F", stroke: "white", strokeWidth: 2 }}
            />
            
            {/* Highlighted points as seen in the image */}
            <ReferenceDot x="Jul" y={38} r={6} fill="#2D9CDB" stroke="white" strokeWidth={2} />
            <ReferenceDot x="Nov" y={18} r={6} fill="#FF5A5F" stroke="white" strokeWidth={2} />
            
            {/* Dotted lines pointing down */}
            <ReferenceLine x="Jul" stroke="#2D9CDB" strokeDasharray="3 3" segment={[{x: "Jul", y: 38}, {x: "Jul", y: 0}]} />
            <ReferenceLine x="Nov" stroke="#FF5A5F" strokeDasharray="3 3" segment={[{x: "Nov", y: 18}, {x: "Nov", y: 0}]} />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Custom manual tooltips floating for the static screenshot look */}
        <div className="absolute top-[8%] left-[55%] -translate-x-1/2 bg-[#E3F2FD] dark:bg-zinc-900 text-[#2D9CDB] px-3 py-1 rounded-md shadow-sm font-semibold text-xs whitespace-nowrap transition-colors border border-transparent dark:border-zinc-800">
          $ 38.753,00
        </div>
        <div className="absolute top-[65%] left-[81%] -translate-x-1/2 bg-[#FFEAEA] dark:bg-red-950/30 text-[#FF5A5F] px-3 py-1 rounded-md shadow-sm font-semibold text-xs whitespace-nowrap transition-colors border border-transparent dark:border-red-900/50">
          $ 18.657,00
        </div>
      </div>
    </div>
  );
};

export default UpdatePackageChart;
