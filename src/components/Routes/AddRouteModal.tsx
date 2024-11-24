import React, { useState } from "react";
import { X } from "lucide-react";

interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRouteAdded: () => void;
}

export default function AddRouteModal({
  isOpen,
  onClose,
  onRouteAdded,
}: AddRouteModalProps) {
  const baseURL = "https://trip-book-backend.onrender.com";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    hours: "",
    minutes: "",
    status: "active",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const estimatedDuration = `${formData.hours}h ${formData.minutes}min`;
      const routeData = {
        name: formData.name,
        price: `${formData.price}Rwf`,
        estimatedDuration,
        status: formData.status,
      };

      const response = await fetch(`${baseURL}/api/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeData),
      });

      if (!response.ok) {
        throw new Error("Failed to add route");
      }

      onRouteAdded(); // Trigger refetch of routes
      onClose();
    } catch (error) {
      console.error("Error adding route:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Route</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Kigali-Huye"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (RWF)
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 3000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Duration
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="hours"
                  type="number"
                  value={formData.hours}
                  onChange={handleChange}
                  min="0"
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Hours"
                  required
                />
                <input
                  name="minutes"
                  type="number"
                  value={formData.minutes}
                  onChange={handleChange}
                  min="0"
                  max="59"
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Minutes"
                  required
                />
              </div>
            </div>

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
                    checked={formData.status === "active"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-primary-600"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-primary-600"
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Route"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
