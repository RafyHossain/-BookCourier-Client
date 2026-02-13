import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Swal from "sweetalert2";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapFlyTo = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 11, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
};

const HoverMarker = ({ position, children }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    mouseover: () => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    },
    mouseout: () => {
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
        confirmButtonColor: "#16A34A"
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary">
            Nationwide Delivery Coverage
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            Hover over markers to see covered areas
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex justify-center mb-10">
          <div className="flex items-center bg-white shadow-lg rounded-full px-5 py-3 w-full max-w-lg border border-slate-100">
            <input
              type="text"
              placeholder="Enter district name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow outline-none bg-transparent text-sm text-slate-700 placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-amber-700 hover:bg-green-700 transition text-white px-6 py-2 rounded-full text-sm ml-3 font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7.5}
            scrollWheelZoom={false}
            className="h-[600px] w-full z-0"
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
                  <div className="p-1 text-center min-w-[150px]">
                    <strong className="text-slate-800 text-lg block mb-1">{district.district}</strong>
                    <span className="text-slate-500 text-sm block mb-2">Division: {district.region}</span>
                    
                    {district.covered_area && (
                        <div className="text-xs text-slate-400 mb-2">
                            Areas: {district.covered_area.join(", ")}
                        </div>
                    )}

                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold inline-block border border-green-200">
                      Delivery Available
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