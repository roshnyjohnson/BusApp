import { useEffect, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import { database } from "../firebase";

function Driver({ user }) {
  const [busId, setBusId] = useState(null);
  const [inputBusId, setInputBusId] = useState("");

  // Fetch driver data
  useEffect(() => {
    const driverRef = ref(database, "drivers/" + user.uid);

    onValue(driverRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.busId) {
        setBusId(data.busId);
      }
    });
  }, [user.uid]);

  const assignBus = () => {
    if (inputBusId) {
      const driverRef = ref(database, "drivers/" + user.uid);
      set(driverRef, { busId: inputBusId, email: user.email });
    }
  };

  // Start GPS tracking
  useEffect(() => {
    if (!busId) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const busRef = ref(database, "buses/" + busId);

        set(busRef, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
          driverId: user.uid
        });

        console.log("Location updated for:", busId);
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
      {
        enableHighAccuracy: true
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [busId, user.uid]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Driver Dashboard</h2>
      <p>Email: {user.email}</p>

      {busId ? (
        <div>
          <h3>Tracking Bus: {busId}</h3>
          <p>Location is being shared...</p>
        </div>
      ) : (
        <div>
          <p>No bus assigned.</p>
          <input
            type="text"
            placeholder="Enter Bus ID (e.g., bus1)"
            value={inputBusId}
            onChange={(e) => setInputBusId(e.target.value)}
          />
          <button onClick={assignBus}>Start Driving</button>
        </div>
      )}
    </div>
  );
}

export default Driver;
