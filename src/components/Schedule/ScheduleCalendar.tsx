import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Schedule {
  time: string;
  route: string;
  status: "active" | "inactive";
}

interface DaySchedule {
  date: number;
  schedules: Schedule[];
  isCurrentMonth: boolean;
}

export default function ScheduleCalendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Mock data for the calendar
  const createMockDaySchedules = (): DaySchedule[] => {
    const schedules: DaySchedule[] = [];
    const daysInMonth = 35; // Show 5 weeks

    for (let i = 0; i < daysInMonth; i++) {
      schedules.push({
        date: i + 1,
        isCurrentMonth: i < 30,
        schedules: [
          {
            time: "10:00 AM",
            route: "New York - Boston",
            status: "active",
          },
          {
            time: "2:30 PM",
            route: "Boston - New York",
            status: "active",
          },
        ],
      });
    }

    return schedules;
  };

  return (
    <div className="bg-white p-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900">{currentMonth}</h2>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Days header */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-white p-4 text-sm font-medium text-gray-900 text-center"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {createMockDaySchedules().map((day, index) => (
          <div
            key={index}
            className={`bg-white p-4 min-h-[160px] border border-gray-100 ${
              !day.isCurrentMonth ? "bg-gray-50" : ""
            }`}
          >
            <div className="font-medium text-sm mb-2">{day.date}</div>
            <div className="space-y-2">
              {day.schedules.map((schedule, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-md text-xs ${
                    schedule.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  } hover:bg-green-100 cursor-pointer transition-colors`}
                >
                  <div className="font-medium">{schedule.time}</div>
                  <div className="text-xs text-gray-600">{schedule.route}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
