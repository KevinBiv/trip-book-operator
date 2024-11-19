import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, MapPin, Bus } from "lucide-react";

interface AddScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  onDateChange: (date: Date | null) => void;
  onScheduleAdded: () => void;
}

interface Bus {
  _id: string;
  plateNumber: string;
  driver: string;
  type: string;
  status: string;
}

interface FormData {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: string;
  notes: string;
}

export default function AddScheduleModal({
  isOpen,
  onClose,
  selectedDate,
  onDateChange,
  onScheduleAdded,
}: AddScheduleModalProps) {
  const [scheduleType, setScheduleType] = useState<"one-time" | "recurring">(
    "one-time"
  );
  const [recurringDays, setRecurringDays] = useState<string[]>([]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isLoadingBuses, setIsLoadingBuses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: "",
    notes: "",
  });

  useEffect(() => {
    const fetchBuses = async () => {
      if (!isOpen) return;
      setIsLoadingBuses(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/api/buses");
        if (!response.ok) throw new Error("Failed to fetch buses");
        const data = await response.json();
        const activeBuses = data.filter((bus: Bus) => bus.status === "active");
        setBuses(activeBuses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch buses");
      } finally {
        setIsLoadingBuses(false);
      }
    };

    fetchBuses();
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBus) {
      setError("Please select a bus");
      return;
    }

    setIsLoading(true);
    setError(null);

    const scheduleData = {
      from: formData.from,
      to: formData.to,
      scheduleType,
      ...(scheduleType === "one-time"
        ? { date: selectedDate?.toISOString() }
        : { recurringDays }),
      departureTime: formData.departureTime,
      arrivalTime: formData.arrivalTime,
      bus: selectedBus._id,
      price: Number(formData.price),
      notes: formData.notes,
    };

    try {
      const response = await fetch("http://localhost:5000/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scheduleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create schedule");
      }

      // Reset form
      setFormData({
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: "",
        notes: "",
      });
      setSelectedBus(null);
      setRecurringDays([]);

      // Call onScheduleAdded instead of onClose
      onScheduleAdded();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create schedule"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
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

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="scheduleForm" onSubmit={handleSubmit} className="space-y-6">
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
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
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
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
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
                      name="date"
                      value={formattedDate}
                      onChange={(e) => {
                        const date = e.target.value
                          ? new Date(e.target.value)
                          : null;
                        if (date) {
                          // Adjust for timezone to prevent off-by-one errors
                          date.setMinutes(
                            date.getMinutes() + date.getTimezoneOffset()
                          );
                        }
                        if (onDateChange) {
                          onDateChange(date);
                        }
                      }}
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
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
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
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bus Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Bus
              </label>
              <div className="relative rounded-lg">
                <Bus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className={`pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    isLoadingBuses ? "bg-gray-50" : ""
                  }`}
                  required
                  disabled={isLoadingBuses}
                  value={selectedBus?._id || ""}
                  onChange={(e) => {
                    const bus = buses.find((b) => b._id === e.target.value);
                    setSelectedBus(bus || null);
                  }}
                >
                  <option value="">Select a bus</option>
                  {buses.map((bus) => (
                    <option key={bus._id} value={bus._id}>
                      {bus.plateNumber} - {bus.type} (Driver: {bus.driver})
                    </option>
                  ))}
                </select>
              </div>
              {selectedBus && (
                <div className="mt-2 text-sm text-gray-600">
                  Driver: {selectedBus.driver}
                </div>
              )}
            </div>

            {/* Fare Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ticket Price (Rwf)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="0"
                required
              />
            </div>

            {/* Notes/Additional Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                rows={3}
                placeholder="Any additional information about this schedule..."
              />
            </div>
          </form>
        </div>

        {/* Modal Footer - Fixed */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="scheduleForm"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-primary-300"
            >
              {isLoading ? "Creating..." : "Create Schedule"}
            </button>
          </div>
          {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          {isLoadingBuses && (
            <div className="mt-2 text-sm text-gray-500">Loading buses...</div>
          )}
        </div>
      </div>
    </div>
  );
}
