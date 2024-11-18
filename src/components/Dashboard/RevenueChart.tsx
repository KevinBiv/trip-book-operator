import React from 'react';

const data = [
  { month: 'Jan', revenue: 30000 },
  { month: 'Feb', revenue: 35000 },
  { month: 'Mar', revenue: 32000 },
  { month: 'Apr', revenue: 38000 },
  { month: 'May', revenue: 42000 },
  { month: 'Jun', revenue: 45000 },
];

export default function RevenueChart() {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="h-64">
      <div className="flex h-full items-end space-x-2">
        {data.map((item) => (
          <div key={item.month} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-primary-200 rounded-t"
              style={{
                height: `${(item.revenue / maxRevenue) * 100}%`,
              }}
            />
            <div className="mt-2 text-sm text-gray-600">{item.month}</div>
            <div className="text-xs text-gray-500">${(item.revenue / 1000).toFixed(1)}k</div>
          </div>
        ))}
      </div>
    </div>
  );
}