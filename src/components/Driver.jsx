import { useEffect } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

function Driver() {

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    // Watch position continuously
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Bus Location:", latitude, longitude);

        // Save location to Firebase under "buses/bus1"
        set(ref(database, "buses/bus1"), {
          lat: latitude,
          lng: longitude,
          timestamp: Date.now()
        });
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );

    // Cleanup watcher on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Driver Page</h1>
      <p>Your bus location is being sent live to Firebase.</p>
    </div>
  );
}

export default Driver;
