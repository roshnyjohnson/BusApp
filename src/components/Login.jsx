import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";

function Login({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await set(ref(database, "users/" + user.uid), {
          email: user.email,
          role: "driver"
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      const messages = {
        "auth/user-not-found": "No account found. Please sign up first.",
        "auth/wrong-password": "Wrong password. Try again.",
        "auth/invalid-email": "Invalid email address.",
        "auth/email-already-in-use": "Email already registered. Try logging in.",
        "auth/invalid-credential": "Invalid credentials. Check email/password or sign up first.",
        "auth/weak-password": "Password must be at least 6 characters.",
      };
      setError(messages[err.code] || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isSignUp ? "Create Driver Account" : "Driver Login"}</h2>

        {error && <div className="error-msg">{error}</div>}

        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAuth()}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAuth()}
        />

        <button className="btn btn-primary" onClick={handleAuth} disabled={loading}>
          {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="toggle-link" onClick={() => { setIsSignUp(!isSignUp); setError(""); }}>
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>

        <button className="btn btn-secondary" onClick={onBack} style={{ marginTop: "12px" }}>
          ← Back to Student View
        </button>
      </div>
    </div>
  );
}

export default Login;
