import { useState } from "react";
import { Calendar, List, Plus, Search, Filter } from "lucide-react";
import ScheduleCalendar from "../components/Schedule/ScheduleCalendar";
import ScheduleList from "../components/Schedule/ScheduleList";
import AddScheduleModal from "../components/Schedule/AddScheduleModal";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

export default function ScheduleDashboard() {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your bus routes and timings
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Schedule</span>
          </button>
        </div>
        {/* Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Search and Filter */}
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search schedules..."
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 text-gray-400 mr-2" />
                <span>Filters</span>
              </button>
            </div>
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView("list")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  view === "list"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">List View</span>
              </button>
              <button
                onClick={() => setView("calendar")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  view === "calendar"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Calendar View</span>
              </button>
            </div>
          </div>
        </div>
        {/* Schedule View Container */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {view === "calendar" ? <ScheduleCalendar /> : <ScheduleList />}
        </div>
        {/* Add Schedule Modal */}
        <AddScheduleModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
