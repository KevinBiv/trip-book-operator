import React from 'react';
import { Bell, Settings, User } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">TripBook Operator</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium">John's Bus Services</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}