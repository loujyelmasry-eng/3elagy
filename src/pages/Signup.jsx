import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useState } from "react";

import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      // create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "patient",
        created_at: new Date()
      });

      alert("Account created successfully!");

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <img src="/logo.jpeg" alt="3elagy Logo" className="auth-logo" />

        <h2>Create Account</h2>
        <p>Join the 3elagy healthcare system</p>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}