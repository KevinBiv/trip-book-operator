import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  Calendar,
  MapPin,
  Users,
  Bus,
  DollarSign,
  Settings,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { name: "Analytics", icon: BarChart2, path: "/" },
  { name: "Schedule", icon: Calendar, path: "/schedule" },
  { name: "Routes", icon: MapPin, path: "/routes" },
  { name: "Passengers", icon: Users, path: "/passengers" },
  { name: "Fleet", icon: Bus, path: "/fleet" },
  { name: "Revenue", icon: DollarSign, path: "/revenue" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Support", icon: HelpCircle, path: "/support" },
];

export default function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-3 py-2 text-base font-medium rounded-lg ${
                  isActive
                    ? "bg-primary-50 text-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    isActive
                      ? "text-primary-600"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
