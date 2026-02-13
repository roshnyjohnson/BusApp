import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "./firebase";
import Login from "./components/Login.jsx";
import Driver from "./components/Driver.jsx";
import Student from "./components/Student.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDriverLogin, setShowDriverLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const roleRef = ref(database, "users/" + currentUser.uid + "/role");
        onValue(roleRef, (snapshot) => {
          const userRole = snapshot.val();
          setRole(userRole);
          setLoading(false);

          if (userRole === "driver") {
            setShowDriverLogin(false);
          }
        });
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading</div>;
  }

  // Driver is logged in — show Driver Dashboard
  if (user && role === "driver") {
    return <Driver user={user} />;
  }

  // Non-driver logged in — sign them out
  if (user && role && role !== "driver") {
    auth.signOut();
  }

  // Driver login page
  if (showDriverLogin) {
    return <Login onBack={() => setShowDriverLogin(false)} />;
  }

  // Default: Student view (no login needed)
  return <Student onDriverLogin={() => setShowDriverLogin(true)} />;
}

export default App;
