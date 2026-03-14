import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useState } from "react";

import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // Firebase checks email + password
      await signInWithEmailAndPassword(auth, email, password);

      // If correct → go to home
      navigate("/home");

    } catch (error) {

      // If incorrect → stay on login page
      alert("Incorrect email or password");

    }

  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <img src="/logo.jpeg" alt="3elagy Logo" className="auth-logo" />

        <h2>Welcome Back</h2>
        <p>Your trusted healthcare platform</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

      </div>

    </div>
  );
}