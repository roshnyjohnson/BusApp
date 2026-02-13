import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function Student() {
  const [busLocation, setBusLocation] = useState(null);
  const [studentLocation, setStudentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [busId, setBusId] = useState("bus1");
  const [inputBusId, setInputBusId] = useState("bus1");

  // Watch student location
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setStudentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Watch bus location
  useEffect(() => {
    if (!busId) return;

    const busRef = ref(database, "buses/" + busId);
    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBusLocation({ lat: data.lat, lng: data.lng });

        // Calculate distance if student location exists
        if (studentLocation) {
          const dist = getDistance(
            studentLocation.lat,
            studentLocation.lng,
            data.lat,
            data.lng
          );
          setDistance(dist.toFixed(2));
        }
      } else {
        setBusLocation(null);
      }
    });

    return () => unsubscribe();
  }, [busId, studentLocation]);

  const handleTrackBus = () => {
    setBusId(inputBusId);
  };

  // Haversine formula to calculate distance in km
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
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

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Student Map</h1>

      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <input
          type="text"
          value={inputBusId}
          onChange={(e) => setInputBusId(e.target.value)}
          placeholder="Bus ID"
        />
        <button onClick={handleTrackBus}>Track</button>
      </div>

      {distance && <p style={{ textAlign: "center" }}>Distance to Bus: {distance} km</p>}

      <MapContainer
        center={studentLocation || [9.575, 76.619]}
        zoom={13}
        style={{ height: "70vh", width: "90%", margin: "auto" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {busLocation && (
          <Marker position={[busLocation.lat, busLocation.lng]}>
            <Popup>Bus: {busId}</Popup>
          </Marker>
        )}

        {studentLocation && (
          <CircleMarker
            center={[studentLocation.lat, studentLocation.lng]}
            radius={8}
            color="blue"
          >
            <Popup>You are here</Popup>
          </CircleMarker>
        )}
      </MapContainer>
    </div>
  );
}

export default Student;
