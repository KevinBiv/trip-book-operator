import React from 'react';

const data = [
  { day: 'Mon', bookings: 145 },
  { day: 'Tue', bookings: 132 },
  { day: 'Wed', bookings: 164 },
  { day: 'Thu', bookings: 156 },
  { day: 'Fri', bookings: 242 },
  { day: 'Sat', bookings: 265 },
  { day: 'Sun', bookings: 187 },
];

export default function BookingsTrend() {
  const maxBookings = Math.max(...data.map(d => d.bookings));
  
  return (
    <div className="h-64">
      <div className="flex h-full items-end space-x-2">
        {data.map((item) => (
          <div key={item.day} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-primary-100 rounded-t"
              style={{
                height: `${(item.bookings / maxBookings) * 100}%`,
              }}
            />
            <div className="mt-2 text-sm text-gray-600">{item.day}</div>
            <div className="text-xs text-gray-500">{item.bookings}</div>
          </div>
        ))}
      </div>
    </div>
  );
}