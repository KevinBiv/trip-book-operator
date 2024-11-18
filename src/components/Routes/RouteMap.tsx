import React from "react";
import { Map } from "lucide-react";

interface RouteMapProps {
  selectedRoute: string | null;
}

export default function RouteMap({ selectedRoute }: RouteMapProps) {
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

  return (
    <div className="h-[400px] bg-gray-100 rounded-lg relative">
      {/* Placeholder for actual map implementation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Map view for route {selectedRoute}</p>
      </div>
    </div>
  );
}
