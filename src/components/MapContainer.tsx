import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapContainerProps {
  userType: "citizen" | "government";
}

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapContainer = ({ userType }: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered at Bhubaneswar
    const map = L.map(mapRef.current).setView([20.2961, 85.8245], 13);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Sample road data for Bhubaneswar
    const roads = [
      {
        name: "Rajpath (Raj Path)",
        coords: [[20.2961, 85.8245], [20.3000, 85.8300]] as [number, number][],
        status: "green"
      },
      {
        name: "Janpath Road",
        coords: [[20.2900, 85.8200], [20.2950, 85.8280]] as [number, number][],
        status: "yellow"
      },
      {
        name: "NH-16 (Bypass)",
        coords: [[20.2800, 85.8100], [20.2900, 85.8200]] as [number, number][],
        status: "red"
      },
      {
        name: "Sachivalaya Marg",
        coords: [[20.2961, 85.8245], [20.2920, 85.8190]] as [number, number][],
        status: "green"
      },
      {
        name: "Station Square to Master Canteen",
        coords: [[20.2700, 85.8300], [20.2800, 85.8350]] as [number, number][],
        status: "yellow"
      }
    ];

    // Color mapping for traffic status
    const getStatusColor = (status: string) => {
      switch (status) {
        case "green": return "#16a34a"; // traffic-green
        case "yellow": return "#eab308"; // traffic-yellow
        case "red": return "#dc2626"; // traffic-red
        default: return "#16a34a";
      }
    };

    // Add roads to map
    roads.forEach((road) => {
      const polyline = L.polyline(road.coords, {
        color: getStatusColor(road.status),
        weight: 6,
        opacity: 0.8,
      }).addTo(map);

      if (userType === "government") {
        // Government can update traffic status
        polyline.on("click", () => {
          const updateMenu = `
            <div style="text-align: center; padding: 10px;">
              <h4 style="margin-bottom: 10px; font-weight: bold;">${road.name}</h4>
              <p style="margin-bottom: 15px; color: #666;">Update Traffic Status:</p>
              <div style="display: flex; gap: 8px; justify-content: center;">
                <button id="greenBtn" style="background: #16a34a; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">🟢 Low</button>
                <button id="yellowBtn" style="background: #eab308; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">🟡 Medium</button>
                <button id="redBtn" style="background: #dc2626; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">🔴 Heavy</button>
              </div>
            </div>
          `;
          
          polyline.bindPopup(updateMenu, { maxWidth: 250 }).openPopup();

          // Add event listeners after popup is rendered
          setTimeout(() => {
            const greenBtn = document.getElementById("greenBtn");
            const yellowBtn = document.getElementById("yellowBtn");
            const redBtn = document.getElementById("redBtn");

            if (greenBtn) greenBtn.onclick = () => {
              polyline.setStyle({ color: getStatusColor("green") });
              road.status = "green";
              map.closePopup();
            };
            if (yellowBtn) yellowBtn.onclick = () => {
              polyline.setStyle({ color: getStatusColor("yellow") });
              road.status = "yellow";
              map.closePopup();
            };
            if (redBtn) redBtn.onclick = () => {
              polyline.setStyle({ color: getStatusColor("red") });
              road.status = "red";
              map.closePopup();
            };
          }, 100);
        });
      } else {
        // Citizens can view traffic info
        polyline.on("click", () => {
          const statusText = {
            green: "Low Traffic - Moving Smoothly",
            yellow: "Medium Traffic - Some Delays",
            red: "Heavy Traffic - Significant Delays"
          }[road.status] || "Unknown";

          const infoPopup = `
            <div style="text-align: center; padding: 10px;">
              <h4 style="margin-bottom: 8px; font-weight: bold;">${road.name}</h4>
              <p style="margin-bottom: 8px; color: ${getStatusColor(road.status)}; font-weight: bold;">${statusText}</p>
              <p style="font-size: 12px; color: #666;">Last updated: ${new Date().toLocaleTimeString()}</p>
            </div>
          `;
          
          polyline.bindPopup(infoPopup, { maxWidth: 200 }).openPopup();
        });
      }
    });

    // For citizens, add location detection
    if (userType === "citizen") {
      map.locate({ setView: true, maxZoom: 16 });

      map.on("locationfound", (e) => {
        const radius = e.accuracy / 2;
        
        L.marker(e.latlng)
          .addTo(map)
          .bindPopup(`📍 You are here<br/>Accuracy: ${Math.round(radius)} meters`)
          .openPopup();

        L.circle(e.latlng, { radius: radius, fillOpacity: 0.1, color: "#3b82f6" }).addTo(map);
      });

      map.on("locationerror", (e) => {
        console.log("Location access denied or failed:", e.message);
        // Add a default marker for demo
        L.marker([20.2961, 85.8245])
          .addTo(map)
          .bindPopup("📍 Default Location - Bhubaneswar")
          .openPopup();
      });
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [userType]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[500px] rounded-lg shadow-soft bg-gradient-map"
      style={{ zIndex: 0 }}
    />
  );
};

export { MapContainer };