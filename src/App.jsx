import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "./firebase";
import Login from "./components/Login.jsx";
import Driver from "./components/Driver.jsx";
import Student from "./components/Student.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch role
        const roleRef = ref(database, "users/" + currentUser.uid + "/role");
        onValue(roleRef, (snapshot) => {
          const userRole = snapshot.val();
          setRole(userRole);
          setLoading(false);
        });
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

  return (
    <div>
      {!user ? (
        <Login />
      ) : role === "driver" ? (
        <Driver user={user} />
      ) : (
        <Student />
      )}
    </div>
  );
}

export default App;
