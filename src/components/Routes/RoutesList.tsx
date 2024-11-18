import React from "react";
import { MapPin, Clock, Users, ChevronRight, AlertCircle } from "lucide-react";

interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  duration: string;
  distance: string;
  stops: number;
  status: "active" | "inactive";
  popularity: number;
}

const routes: Route[] = [
  {
    id: "1",
    name: "New York - Boston Express",
    startPoint: "New York City Bus Terminal",
    endPoint: "South Station, Boston",
    duration: "4h 15m",
    distance: "215 mi",
    stops: 2,
    status: "active",
    popularity: 85,
  },
  {
    id: "2",
    name: "LA - San Francisco Coastal",
    startPoint: "Los Angeles Union Station",
    endPoint: "Salesforce Transit Center",
    duration: "7h 30m",
    distance: "383 mi",
    stops: 4,
    status: "active",
    popularity: 92,
  },
  {
    id: "3",
    name: "Chicago - Detroit Direct",
    startPoint: "Chicago Union Station",
    endPoint: "Detroit Transit Center",
    duration: "5h 45m",
    distance: "281 mi",
    stops: 1,
    status: "inactive",
    popularity: 78,
  },
];

interface RoutesListProps {
  onRouteSelect: (routeId: string) => void;
  selectedRoute: string | null;
}

export default function RoutesList({
  onRouteSelect,
  selectedRoute,
}: RoutesListProps) {
  return (
    <div className="overflow-hidden">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {routes.map((route) => (
            <li
              key={route.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                selectedRoute === route.id ? "bg-primary-50" : ""
              }`}
              onClick={() => onRouteSelect(route.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {route.name}
                    </p>
                    <div className="flex items-center">
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
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 h-4 w-4 text-gray-400" />
                      <span className="ml-1 truncate">
                        {route.startPoint} → {route.endPoint}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 h-4 w-4 text-gray-400" />
                      <span className="ml-1">{route.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="flex-shrink-0 h-4 w-4 text-gray-400" />
                      <span className="ml-1">
                        {route.popularity}% occupancy
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {route.stops} stops
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
