import React from 'react';
import { BarChart2, Calendar, MapPin, Users, Bus, CreditCard, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { name: 'Analytics', icon: BarChart2, current: true },
  { name: 'Schedule', icon: Calendar, current: false },
  { name: 'Routes', icon: MapPin, current: false },
  { name: 'Passengers', icon: Users, current: false },
  { name: 'Fleet', icon: Bus, current: false },
  { name: 'Revenue', icon: CreditCard, current: false },
  { name: 'Settings', icon: Settings, current: false },
  { name: 'Support', icon: HelpCircle, current: false },
];

export default function DashboardSidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-8">
        <div className="px-2 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`${
                item.current
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              } group flex items-center px-4 py-3 text-sm font-medium rounded-md`}
            >
              <item.icon
                className={`${
                  item.current ? 'text-primary-600' : 'text-gray-400'
                } mr-3 h-5 w-5`}
              />
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}