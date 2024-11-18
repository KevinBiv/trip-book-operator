import React, { useState } from "react";
import { X, MapPin, Clock, Plus } from "lucide-react";

interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddRouteModal({ isOpen, onClose }: AddRouteModalProps) {
  const [stops, setStops] = useState<string[]>([]);
  const [newStop, setNewStop] = useState("");

  if (!isOpen) return null;

  const handleAddStop = () => {
    if (newStop.trim()) {
      setStops([...stops, newStop.trim()]);
      setNewStop("");
    }
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Route</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          <form className="space-y-6">
            {/* Route Endpoints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Starting point"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Destination"
                  />
                </div>
              </div>
            </div>

            {/* Route Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distance
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., 215 miles"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 4h 30m"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Stops */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stops
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStop}
                    onChange={(e) => setNewStop(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Add a stop"
                  />
                  <button
                    type="button"
                    onClick={handleAddStop}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {stops.map((stop, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                    >
                      {stop}
                      <button
                        type="button"
                        onClick={() => handleRemoveStop(index)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Route Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bus Types
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  multiple
                >
                  <option value="express">Express</option>
                  <option value="regular">Regular</option>
                  <option value="luxury">Luxury</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Hold Ctrl/Cmd to select multiple types
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option value="">Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekdays">Weekdays Only</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            {/* Route Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    className="form-radio h-4 w-4 text-primary-600"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    className="form-radio h-4 w-4 text-primary-600"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Any additional information about this route..."
              />
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Create Route
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
