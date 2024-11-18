import React from "react";
import {
  MoreVertical,
  MapPin,
  Clock,
  AlertTriangle,
  Bus,
  User,
} from "lucide-react";

interface Schedule {
  id: number;
  route: string;
  departure: string;
  arrival: string;
  bus: string;
  driver: string;
  status: "On Time" | "Delayed" | "Completed";
  type: "Express" | "Regular";
}

const schedules: Schedule[] = [
  {
    id: 1,
    route: "New York - Boston",
    departure: "10:00 AM",
    arrival: "2:00 PM",
    bus: "Bus 123",
    driver: "John Smith",
    status: "On Time",
    type: "Express",
  },
  {
    id: 2,
    route: "Boston - New York",
    departure: "2:30 PM",
    arrival: "6:30 PM",
    bus: "Bus 456",
    driver: "Sarah Johnson",
    status: "Delayed",
    type: "Regular",
  },
  // Add more schedules as needed
];

export default function ScheduleList() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Route
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Bus & Driver
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <tr
              key={schedule.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {schedule.route}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {schedule.departure}
                </div>
                <div className="text-sm text-gray-500">{schedule.arrival}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bus className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {schedule.bus}
                    </div>
                    <div className="text-sm text-gray-500">
                      {schedule.driver}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    schedule.status === "On Time"
                      ? "bg-green-100 text-green-800"
                      : schedule.status === "Delayed"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {schedule.status === "Delayed" && (
                    <AlertTriangle className="h-4 w-4 mr-1" />
                  )}
                  {schedule.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    schedule.type === "Express"
                      ? "bg-primary-100 text-primary-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {schedule.type}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
