
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
  
    await signOut(auth);
  
    navigate("/login");
  
  };
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>

    <div className="logo">
    <img src="/logo.jpeg" alt="3elagy Logo" />
    </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
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
      <button onClick={handleLogout} className="logout-btn">
  Logout
</button>
      <Link className="profile-btn" to="/profile">Profile</Link>
    </nav>
  );
}