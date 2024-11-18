import React from "react";
import { Clock, ChevronRight, AlertCircle } from "lucide-react";

interface Route {
  id: string;
  name: string;
  price: string;
  estimatedDuration: string;
  status: "active" | "inactive";
}

interface RoutesListProps {
  onRouteSelect: (routeId: string) => void;
  selectedRoute: string | null;
  routes: Route[];
}

export default function RoutesList({
  onRouteSelect,
  selectedRoute,
  routes,
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
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 h-4 w-4 text-gray-400" />
                      <span className="ml-1">{route.estimatedDuration}</span>
                    </div>
                    <div className="text-sm font-medium text-primary-600">
                      {route.price}
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
