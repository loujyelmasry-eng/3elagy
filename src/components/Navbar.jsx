import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  // Fetch logged in user
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUser();
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

      {/* Logo */}
      <div className="logo">
        <Link to="/home">
          <img src="/logo.jpeg" alt="3elagy Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>

        <div className="dropdown">
          <Link to="/services" className="dropdown-trigger">
            Services ▾
          </Link>

          <div className="dropdown-menu">
            <Link to="/medicine-search">Medicine Search</Link>
            <Link to="/blood-requests">Blood Requests</Link>
            <Link to="/lab-tests">Lab Tests</Link>
          </div>
        </div>

        <Link to="/contact">Contact</Link>
      </div>

      {/* Right Side Buttons */}
      <div className="nav-user">
        <Link className="profile-btn" to="/profile">
          Profile
        </Link>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

    </nav>
  );
}
