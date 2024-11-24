import React, { useState } from "react";
import { X } from "lucide-react";

interface AddBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBusAdded: () => void; // Callback to refresh bus list
}

interface BusFormData {
  plateNumber: string;
  driver: string;
  type: string;
  status: string;
}

export default function AddBusModal({
  isOpen,
  onClose,
  onBusAdded,
}: AddBusModalProps) {
  const [formData, setFormData] = useState<BusFormData>({
    plateNumber: "",
    driver: "",
    type: "",
    status: "active",
  });

  const baseURL = "https://trip-book-backend.onrender.com";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}/api/buses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add bus");
      }

      // Successfully added
      onBusAdded(); // Refresh the bus list
      onClose(); // Close the modal
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add bus");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Bus</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Plate Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plate Number
              </label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="e.g., RAD 123 A"
                required
              />
            </div>

            {/* Driver */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Driver
              </label>
              <input
                type="text"
                name="driver"
                value={formData.driver}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Driver's name"
                required
              />
            </div>

            {/* Bus Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="">Select type</option>
                <option value="Express">Express</option>
                {/* <option value="Regular">Regular</option> */}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-primary-300"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Bus"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
