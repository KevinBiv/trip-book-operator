import React, { useState, useEffect } from "react";
import { MapPin, Clock, Bus, AlertTriangle, MoreVertical } from "lucide-react";

interface Schedule {
  _id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  bus: {
    _id: string;
    plateNumber: string;
    driver: string;
    type: string;
  };
  status: "scheduled" | "in-transit" | "completed" | "cancelled";
  price: number;
  scheduleType: "one-time" | "recurring";
  date?: string;
  recurringDays?: string[];
}

interface ScheduleListProps {
  refreshTrigger: number;
}

export default function ScheduleList({ refreshTrigger }: ScheduleListProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSchedules();
  }, [refreshTrigger]); // Refetch when refreshTrigger changes

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/schedules");
      if (!response.ok) {
        throw new Error("Failed to fetch schedules");
      }
      const data = await response.json();
      setSchedules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading schedules...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Route
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Bus & Driver
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <tr key={schedule._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {schedule.from} → {schedule.to}
                    </div>
                    <div className="text-sm text-gray-500">
                      {schedule.scheduleType === "recurring"
                        ? `Every ${schedule.recurringDays?.join(", ")}`
                        : new Date(schedule.date!).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {schedule.departureTime}
                </div>
                <div className="text-sm text-gray-500">
                  {schedule.arrivalTime}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Bus className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {schedule.bus.plateNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {schedule.bus.driver}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    schedule.status === "scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : schedule.status === "in-transit"
                      ? "bg-yellow-100 text-yellow-800"
                      : schedule.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {schedule.status === "cancelled" && (
                    <AlertTriangle className="h-4 w-4 mr-1" />
                  )}
                  {schedule.status.charAt(0).toUpperCase() +
                    schedule.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {schedule.price.toLocaleString()} Rwf
                </div>
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
