import { useState, useEffect } from "react";
import { Plus, Search, Filter, Bus, AlertCircle } from "lucide-react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import AddBusModal from "../components/Fleet/AddBusModal";

interface BusInfo {
  _id: string;
  plateNumber: string;
  driver: string;
  type: "Express" | "Regular";
  status: "active" | "maintenance" | "inactive";
}

export default function FleetDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [buses, setBuses] = useState<BusInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/buses");
      if (!response.ok) {
        throw new Error("Failed to fetch buses");
      }
      const data = await response.json();
      setBuses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleBusAdded = () => {
    fetchBuses(); // Refresh the list when a new bus is added
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Fleet Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your company's buses</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Bus</span>
          </button>
        </div>

        {/* Search and Filters */}
        {/* ... (keep existing search and filters section) ... */}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">{error}</div>
        )}

        {/* Bus List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading...</div>
          ) : buses.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No buses found</div>
          ) : (
            <div className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bus Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {buses.map((bus) => (
                    <tr key={bus._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Bus className="h-10 w-10 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {bus.plateNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {bus.driver}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bus.type === "Express"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {bus.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            bus.status === "active"
                              ? "bg-green-100 text-green-800"
                              : bus.status === "maintenance"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bus.status === "inactive" && (
                            <AlertCircle className="h-4 w-4 mr-1" />
                          )}
                          {bus.status.charAt(0).toUpperCase() +
                            bus.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900 mr-4">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Bus Modal */}
        <AddBusModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onBusAdded={handleBusAdded}
        />
      </div>
    </DashboardLayout>
  );
}
