import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Haversine formula — calculates distance between two points in km
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Auto-zoom map to fit markers
function MapAutoFit({ studentLocation, busLocation }) {
  const map = useMap();

  useEffect(() => {
    if (studentLocation && busLocation) {
      const bounds = L.latLngBounds([
        [studentLocation.lat, studentLocation.lng],
        [busLocation.lat, busLocation.lng],
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (studentLocation) {
      map.setView([studentLocation.lat, studentLocation.lng], 14);
    }
  }, [busLocation, studentLocation, map]);

  return null;
}

function Student({ onDriverLogin }) {
  const [busLocation, setBusLocation] = useState(null);
  const [studentLocation, setStudentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [busId, setBusId] = useState("bus1");

  // Watch student's own location
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setStudentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error("Student geolocation error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Watch selected bus location from Firebase
  useEffect(() => {
    if (!busId) return;

    const busRef = ref(database, "buses/" + busId);
    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBusLocation({ lat: data.lat, lng: data.lng });
      } else {
        setBusLocation(null);
      }
    });

    return () => unsubscribe();
  }, [busId]);

  // Calculate distance whenever either location changes (fixes stale closure bug)
  useEffect(() => {
    if (studentLocation && busLocation) {
      const dist = getDistance(
        studentLocation.lat,
        studentLocation.lng,
        busLocation.lat,
        busLocation.lng
      );
      setDistance(dist.toFixed(2));
    } else {
      setDistance(null);
    }
  }, [studentLocation, busLocation]);

  return (
    <div className="student-page">
      {/* Header */}
      <div className="header">
        <h1>🚌 Bus Tracker</h1>
        {onDriverLogin && (
          <button className="btn btn-primary" onClick={onDriverLogin}>
            Driver Login
          </button>
        )}
      </div>

      {/* Bus selector */}
      <div className="bus-selector">
        <label>Select Bus:</label>
        <select
          className="select"
          value={busId}
          onChange={(e) => setBusId(e.target.value)}
        >
          <option value="bus1">Bus 1</option>
          <option value="bus2">Bus 2</option>
          <option value="bus3">Bus 3</option>
        </select>
      </div>

      {/* Distance or status bar */}
      {distance && <div className="distance-bar">📏 You are {distance} km away from the Bus </div>}
      {!busLocation && <div className="bus-inactive">⚠ Bus {busId.replace("bus", "")} is not currently active</div>}

      {/* Map */}
      <MapContainer
        center={studentLocation || [9.575, 76.619]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <MapAutoFit studentLocation={studentLocation} busLocation={busLocation} />

        {busLocation && (
          <Marker position={[busLocation.lat, busLocation.lng]}>
            <Popup>🚌 Bus {busId.replace("bus", "")}</Popup>
          </Marker>
        )}

        {studentLocation && (
          <CircleMarker
            center={[studentLocation.lat, studentLocation.lng]}
            radius={8}
            color="#3b82f6"
            fillColor="#3b82f6"
            fillOpacity={0.6}
          >
            <Popup>📍 You are here</Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}

export default Student;
