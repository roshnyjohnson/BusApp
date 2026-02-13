
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("student"); // Default role

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Sign Up Logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user role to Realtime Database
        await set(ref(database, "users/" + user.uid), {
          email: user.email,
          role: role
        });

        alert("Account created successfully!");
      } else {
        // Login Logic
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{isSignUp ? "Create Account" : "Login"}</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br /><br />

      {isSignUp && (
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value)}
            /> Student
          </label>
          <span style={{ margin: "0 10px" }}>|</span>
          <label>
            <input
              type="radio"
              name="role"
              value="driver"
              checked={role === "driver"}
              onChange={(e) => setRole(e.target.value)}
            /> Driver
          </label>
        </div>
      )}

      <button onClick={handleAuth}>
        {isSignUp ? "Sign Up" : "Login"}
      </button>

      <p onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: "pointer", color: "blue" }}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
}

export default Login;
