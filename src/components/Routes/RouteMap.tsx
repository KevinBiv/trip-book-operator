// RouteMap.tsx
import React from "react";
import { Map } from "lucide-react";

interface Route {
  id: string;
  name: string;
  price: string;
  estimatedDuration: string;
  status: "active" | "inactive";
}

interface RouteMapProps {
  selectedRoute: string | null;
  routes: Route[];
}

export default function RouteMap({ selectedRoute, routes }: RouteMapProps) {
  if (!selectedRoute) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <Map className="h-12 w-12 text-gray-400 mx-auto" />
          <p className="mt-2 text-sm text-gray-500">
            Select a route to view its map
          </p>
        </div>
      </div>
    );
  }

  const selectedRouteData = routes.find((route) => route.id === selectedRoute);

  return (
    <div className="h-[400px] bg-gray-100 rounded-lg relative">
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {selectedRouteData?.name}
        </h3>
        <p className="text-gray-500">
          Duration: {selectedRouteData?.estimatedDuration}
        </p>
        <p className="text-gray-500">Price: {selectedRouteData?.price}</p>
      </div>
    </div>
  );
}
