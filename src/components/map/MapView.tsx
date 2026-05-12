"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MapViewProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
  markers?: { lat: number; lng: number; label: string; color?: string }[];
  hideCenter?: boolean;
}

export default function MapView({
  lat,
  lng,
  zoom = 10,
  className,
  markers = [],
  hideCenter = false,
}: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "bg-surface-container-low rounded-lg border border-white/5 flex items-center justify-center",
          className
        )}
      >
        <div className="text-on-surface-variant/40 font-mono text-data-mono">
          Loading map...
        </div>
      </div>
    );
  }

  return <MapViewClient lat={lat} lng={lng} zoom={zoom} className={className} markers={markers} hideCenter={hideCenter} />;
}

function MapViewClient({
  lat,
  lng,
  zoom = 10,
  className,
  markers = [],
  hideCenter = false,
}: MapViewProps) {
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [RL, setRL] = useState<typeof import("react-leaflet") | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    Promise.all([import("leaflet"), import("react-leaflet")]).then(
      ([leaflet, reactLeaflet]) => {
        // Import leaflet CSS
        import("leaflet/dist/leaflet.css");

        // Fix default marker icons
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        setL(leaflet);
        setRL(reactLeaflet);
        setMapReady(true);
      }
    );
  }, []);

  if (!mapReady || !L || !RL) {
    return (
      <div
        className={cn(
          "bg-surface-container-low rounded-lg border border-white/5 flex items-center justify-center",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary-fixed/30 border-t-primary-fixed rounded-full animate-spin" />
          <span className="text-on-surface-variant/40 font-mono text-[10px] tracking-wider">
            LOADING MAP DATA
          </span>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Tooltip } = RL;

  return (
    <div className={cn("rounded-lg overflow-hidden border border-white/5", className)}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        style={{ height: "100%", width: "100%", minHeight: "300px" }}
        zoomControl={true}
        attributionControl={false}
      >
        {/* Dark themed tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Main location marker (shown only if not hidden) */}
        {!hideCenter && (
          <CircleMarker
            center={[lat, lng]}
            radius={12}
            pathOptions={{
              color: "#00f5ff",
              fillColor: "#00f5ff",
              fillOpacity: 0.4,
              weight: 2,
            }}
          >
            <Tooltip permanent direction="top" offset={[0, -15]}>
              <span className="font-mono text-xs font-bold">Target Location</span>
            </Tooltip>
          </CircleMarker>
        )}

        {/* Constituency markers */}
        {markers.map((marker, i) => (
          <CircleMarker
            key={i}
            center={[marker.lat, marker.lng]}
            radius={9}
            pathOptions={{
              color: marker.color || "#bbc3ff",
              fillColor: marker.color || "#bbc3ff",
              fillOpacity: 0.5,
              weight: 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -10]}>
              <span className="font-mono text-xs">{marker.label}</span>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
