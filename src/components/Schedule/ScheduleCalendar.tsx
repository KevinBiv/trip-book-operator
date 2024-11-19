import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AddScheduleModal from "./AddScheduleModal";

interface Schedule {
  time: string;
  route: string;
  status: "active" | "inactive";
}

interface DaySchedule {
  date: Date;
  schedules: Schedule[];
  isCurrentMonth: boolean;
}

interface ScheduleCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
  onAddSchedule: () => void;
  refreshTrigger: number;
}

export default function ScheduleCalendar({
  selectedDate,
  onDateSelect,
  onAddSchedule,
  refreshTrigger,
}: ScheduleCalendarProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  //   useEffect(() => {
  //     // Add your schedule fetching logic here
  //     fetchSchedules();
  //   }, [refreshTrigger]); // Refetch when refreshTrigger changes

  // Function to generate calendar days
  const createCalendarDays = (): DaySchedule[] => {
    const days: DaySchedule[] = [];
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startDay = startDate.getDay();

    // Add days from previous month
    const prevMonthDays = startDay;
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(startDate);
      date.setDate(-i);
      days.push({
        date,
        isCurrentMonth: false,
        schedules: [],
      });
    }

    // Add days from current month
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      days.push({
        date,
        isCurrentMonth: true,
        schedules: [
          {
            time: "10:00 AM",
            route: "Kigali - Muhanga",
            status: "active",
          },
          {
            time: "2:30 PM",
            route: "Kigali - Muhanga",
            status: "active",
          },
        ],
      });
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        i
      );
      days.push({
        date,
        isCurrentMonth: false,
        schedules: [],
      });
    }

    return days;
  };

  const handleDayClick = (day: DaySchedule) => {
    onDateSelect(day.date);
    onAddSchedule();
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
        {createCalendarDays().map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`bg-white p-4 min-h-[160px] border border-gray-100 
              ${!day.isCurrentMonth ? "bg-gray-50" : ""} 
              hover:bg-gray-50 cursor-pointer transition-colors
              ${
                selectedDate &&
                day.date.toDateString() === selectedDate.toDateString()
                  ? "ring-2 ring-primary-500"
                  : ""
              }
            `}
          >
            <div className="font-medium text-sm mb-2">{day.date.getDate()}</div>
            <div className="space-y-2">
              {day.schedules.map((schedule, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-md text-xs ${
                    schedule.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-700"
                  } hover:bg-green-100 transition-colors`}
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
