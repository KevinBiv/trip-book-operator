import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Bus,
  User,
  AlertCircle,
} from "lucide-react";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddScheduleModal({
  isOpen,
  onClose,
}: AddScheduleModalProps) {
  const [scheduleType, setScheduleType] = useState<"one-time" | "recurring">(
    "one-time"
  );
  const [recurringDays, setRecurringDays] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Schedule
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Schedule Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Schedule Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setScheduleType("one-time")}
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    scheduleType === "one-time"
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  One-time Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleType("recurring")}
                  className={`flex-1 py-2 px-4 rounded-lg border ${
                    scheduleType === "recurring"
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Recurring Schedule
                </button>
              </div>
            </div>

            {/* Route Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <div className="relative rounded-lg">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Departure city"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <div className="relative rounded-lg">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Arrival city"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Schedule Timing */}
            {scheduleType === "recurring" && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Recurring Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          if (recurringDays.includes(day)) {
                            setRecurringDays(
                              recurringDays.filter((d) => d !== day)
                            );
                          } else {
                            setRecurringDays([...recurringDays, day]);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg border ${
                          recurringDays.includes(day)
                            ? "bg-primary-50 border-primary-600 text-primary-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scheduleType === "one-time" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative rounded-lg">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Time
                </label>
                <div className="relative rounded-lg">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival Time
                </label>
                <div className="relative rounded-lg">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bus Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus
                </label>
                <div className="relative rounded-lg">
                  <Bus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select a bus</option>
                    <option value="bus1">Bus 001 (45 seats)</option>
                    <option value="bus2">Bus 002 (50 seats)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Driver
                </label>
                <div className="relative rounded-lg">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select a driver</option>
                    <option value="driver1">John Smith</option>
                    <option value="driver2">Sarah Johnson</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Fare Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="0.00"
                required
              />
            </div>

            {/* Notes/Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Any additional information about this schedule..."
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Create Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
