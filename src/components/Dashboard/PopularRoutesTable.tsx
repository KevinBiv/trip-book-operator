import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const routes = [
  {
    route: 'New York - Boston',
    revenue: 12420,
    passengers: 824,
    trend: 'up',
    change: '+12.5%',
  },
  {
    route: 'Los Angeles - San Francisco',
    revenue: 10890,
    passengers: 654,
    trend: 'up',
    change: '+8.2%',
  },
  {
    route: 'Chicago - Detroit',
    revenue: 8650,
    passengers: 542,
    trend: 'down',
    change: '-3.1%',
  },
  {
    route: 'Seattle - Portland',
    revenue: 7230,
    passengers: 432,
    trend: 'up',
    change: '+5.7%',
  },
];

export default function PopularRoutesTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Route
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Passengers
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trend
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {routes.map((route) => (
            <tr key={route.route}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {route.route}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${route.revenue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {route.passengers}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center">
                  {route.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`${
                      route.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {route.change}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}