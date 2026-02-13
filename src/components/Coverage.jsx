import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Map Controller for smooth flying animation
const MapFlyTo = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 11, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

// Custom Marker component that opens Popup on Hover
const HoverMarker = ({ position, children }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    mouseover: () => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    },
    mouseout: () => {
      // Optional: keep popup open or close it. 
      // Usually better UX to close it unless clicked.
      if (markerRef.current) {
        markerRef.current.closePopup();
      }
    },
    click: () => {
        if (markerRef.current) {
            markerRef.current.openPopup();
        }
    }
  };

  return (
    <Marker ref={markerRef} position={position} eventHandlers={eventHandlers}>
      {children}
    </Marker>
  );
};

const Coverage = () => {
  const [districts, setDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    fetch("/bdDistricts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.error("JSON load error:", err));
  }, []);

  const normalize = (text) =>
    text?.toLowerCase().replace(/\s+/g, "").replace(/'/g, "");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    const input = normalize(search);

    const found = districts.find((d) =>
      normalize(d.district).includes(input)
    );

    if (found) {
      setSearchLocation([Number(found.latitude), Number(found.longitude)]);
    } else {
      Swal.fire({
        icon: "error",
        title: "District not found",
        text: "Please enter a valid district name",
        confirmButtonColor: "#b91c1c"
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-[#b91c1c] font-bold tracking-widest uppercase text-sm bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Locations
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 mb-4">
            Nationwide <span className="text-transparent text-primary">Coverage</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            We deliver books to every corner of Bangladesh. Hover over markers to check your area.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex justify-center mb-10">
          <div className="flex items-center bg-white shadow-xl shadow-red-500/5 rounded-full px-5 py-3 w-full max-w-lg border border-slate-100 focus-within:border-red-200 transition-colors">
            <input
              type="text"
              placeholder="Type your district name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow outline-none bg-transparent text-sm text-slate-700 placeholder-slate-400 font-medium"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#b91c1c] to-[#ef4444] hover:shadow-lg hover:shadow-red-500/30 transition-all text-white px-6 py-2 rounded-full text-sm ml-3 font-bold"
            >
              Check Availability
            </button>
          </div>
        </form>

        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200 bg-white relative z-0">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            scrollWheelZoom={false}
            className="h-[600px] w-full outline-none"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapFlyTo center={searchLocation} />

            {districts.map((district, index) => (
              <HoverMarker
                key={index}
                position={[
                  Number(district.latitude),
                  Number(district.longitude),
                ]}
              >
                <Popup>
                  <div className="p-2 text-center min-w-[180px]">
                    <strong className="text-slate-900 text-lg block mb-1 font-black">{district.district}</strong>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-3 border-b border-slate-100 pb-2">
                        {district.region} Division
                    </span>
                    
                    {district.covered_area && (
                        <div className="text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg">
                            <span className="font-bold text-slate-700 block mb-1">Key Areas:</span> 
                            {district.covered_area.join(", ")}
                        </div>
                    )}

                    <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-black inline-flex items-center gap-1 border border-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Delivery Active
                    </div>
                  </div>
                </Popup>
              </HoverMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;