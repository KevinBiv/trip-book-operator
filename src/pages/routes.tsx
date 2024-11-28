import { useState, useEffect } from "react";
import { Plus, Search, Filter, Map, List, AlertCircle } from "lucide-react";
import RoutesList from "../components/Routes/RoutesList";
import AddRouteModal from "../components/Routes/AddRouteModal";
import RouteMap from "../components/Routes/RouteMap";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

interface Route {
  id: string;
  name: string;
  price: string;
  estimatedDuration: string;
  status: "active" | "inactive";
}

export default function RoutesDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [view, setView] = useState<"split" | "table">("split");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRoutes = async () => {
    const baseURL = "https://trip-book-backend.onrender.com";

    try {
      const response = await fetch(`${baseURL}/api/routes`);
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const data = await response.json();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Filter routes based on search query
  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Routes Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your bus routes</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Route</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {/* Search and Filter */}
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search routes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                onClick={() => setView("split")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  view === "split"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Map className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Map View</span>
              </button>
              <button
                onClick={() => setView("table")}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  view === "table"
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">Table View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading routes...</div>
          </div>
        ) : filteredRoutes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm">
            <Map className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">No routes found</p>
          </div>
        ) : view === "split" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Routes List */}
            <div className="bg-white rounded-lg shadow-sm">
              {/* <RoutesList
                routes={filteredRoutes}
                onRouteSelect={setSelectedRoute}
                selectedRoute={selectedRoute}
              /> */}
            </div>
            {/* Map View */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Route Map</h3>
                <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                  <Map className="h-5 w-5" />
                  <span>Full Screen</span>
                </button>
              </div>
              <RouteMap selectedRoute={selectedRoute} routes={routes} />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Route Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Duration
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
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {route.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {route.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {route.estimatedDuration}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            route.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {route.status === "inactive" && (
                            <AlertCircle className="h-4 w-4 mr-1" />
                          )}
                          {route.status.charAt(0).toUpperCase() +
                            route.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedRoute(route.id)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Route Modal */}
        <AddRouteModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onRouteAdded={fetchRoutes}
        />
      </div>
    </DashboardLayout>
  );
}
