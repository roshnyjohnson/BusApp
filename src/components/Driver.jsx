import { useEffect, useState } from "react";
import { ref, set, remove, onValue } from "firebase/database";
import { database, auth } from "../firebase";

function Driver({ user }) {
  const [busId, setBusId] = useState(null);
  const [inputBusId, setInputBusId] = useState("bus1");
  const [gpsStatus, setGpsStatus] = useState("waiting"); // waiting | active | error
  const [lastCoords, setLastCoords] = useState(null);

  // Fetch driver's assigned bus
  useEffect(() => {
    const driverRef = ref(database, "drivers/" + user.uid);
    const unsubscribe = onValue(driverRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.busId) {
        setBusId(data.busId);
      }
    });

    return () => unsubscribe();
  }, [user.uid]);

  // GPS tracking — runs when bus is assigned
  useEffect(() => {
    if (!busId) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const busRef = ref(database, "buses/" + busId);
        set(busRef, {
          lat: coords.lat,
          lng: coords.lng,
          timestamp: Date.now(),
          driverId: user.uid,
        });

        setLastCoords(coords);
        setGpsStatus("active");
      },
      (error) => {
        console.error("Geolocation error:", error.message);
        setGpsStatus("error");
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [busId, user.uid]);

  const assignBus = () => {
    if (!inputBusId.trim()) return;
    const driverRef = ref(database, "drivers/" + user.uid);
    set(driverRef, { busId: inputBusId.trim(), email: user.email });
  };

  const stopDriving = () => {
    // Remove live bus location and driver assignment
    remove(ref(database, "buses/" + busId));
    remove(ref(database, "drivers/" + user.uid));
    setBusId(null);
    setGpsStatus("waiting");
    setLastCoords(null);
  };

  const handleLogout = () => {
    if (busId) stopDriving();
    auth.signOut();
  };

  return (
    <div className="driver-page">
      <div className="header">
        <h2>🚌 Driver Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="driver-content">
        <p className="driver-email">{user.email}</p>

        {busId ? (
          <div className="driver-card">
            <h3>Tracking Bus: {busId}</h3>

            {gpsStatus === "active" && (
              <div className="gps-status active">
                <span className="pulse-dot"></span>
                Location is being shared live
              </div>
            )}

            {gpsStatus === "waiting" && (
              <div className="gps-status" style={{ background: "#fefce8", color: "#92400e", border: "1px solid #fde68a" }}>
                ⏳ Acquiring GPS signal...
              </div>
            )}

            {gpsStatus === "error" && (
              <div className="gps-status error">
                ❌ GPS error — please allow location access
              </div>
            )}

            {lastCoords && (
              <p className="gps-details">
                📍 {lastCoords.lat.toFixed(5)}, {lastCoords.lng.toFixed(5)}
              </p>
            )}

            <button className="btn btn-secondary" onClick={stopDriving} style={{ marginTop: "16px" }}>
              Stop Driving
            </button>
          </div>
        ) : (
          <div className="driver-card">
            <h3>Select Your Bus</h3>
            <p style={{ color: "var(--gray-500)", marginBottom: "16px" }}>
              Choose a bus to start sharing your location
            </p>

            <div className="assign-bus-row">
              <select
                className="select"
                value={inputBusId}
                onChange={(e) => setInputBusId(e.target.value)}
              >
                <option value="bus1">Bus 1</option>
                <option value="bus2">Bus 2</option>
                <option value="bus3">Bus 3</option>
              </select>
              <button className="btn btn-success" onClick={assignBus}>
                Start Driving
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Driver;
