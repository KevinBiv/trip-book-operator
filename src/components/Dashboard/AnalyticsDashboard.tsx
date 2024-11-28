import {
  TrendingUp,
  TrendingDown,
  Users,
  Bus,
  MapPin,
  DollarSign,
} from "lucide-react";
import RevenueChart from "../Dashboard/RevenueChart";
import PopularRoutesTable from "../Dashboard/PopularRoutesTable";
import BookingsTrend from "../Dashboard/BookingsTrend";
import RoutesTable from "../Routes/RoutesTable";
import { useEffect, useState } from "react";

const stats = [
  {
    name: "Total Revenue",
    value: "5,231,000Rwf",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    name: "Active Buses",
    value: "24",
    change: "+2",
    trend: "up",
    icon: Bus,
  },
  {
    name: "Total Passengers",
    value: "1,429",
    change: "+5.25%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Routes Coverage",
    value: "38",
    change: "-1",
    trend: "down",
    icon: MapPin,
  },
];

export default function AnalyticsDashboard() {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPopularRoutes = async () => {
    const baseURL = "https://trip-book-backend.onrender.com";

    try {
      // You might want to modify the endpoint to get only popular routes
      // e.g., /api/routes/popular or add a query parameter ?limit=5
      const response = await fetch(`${baseURL}/api/routes`);
      if (!response.ok) {
        throw new Error("Failed to fetch routes");
      }
      const data = await response.json();
      // For now, let's just take the top 5 routes
      setPopularRoutes(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching popular routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularRoutes();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  stat.trend === "up" ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <stat.icon
                  className={`h-6 w-6 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`ml-2 text-sm ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Revenue Overview
          </h3>
          <RevenueChart />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Bookings Trend
          </h3>
          <BookingsTrend />
        </div>
      </div>

      {/* Popular Routes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Popular Routes
          </h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin h-8 w-8 border-4 border-primary-600 rounded-full border-t-transparent"></div>
            </div>
          ) : (
            <RoutesTable
              routes={popularRoutes}
              onRouteSelect={(routeId) => {
                // Handle route selection - maybe navigate to route details
                console.log("Selected route:", routeId);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
