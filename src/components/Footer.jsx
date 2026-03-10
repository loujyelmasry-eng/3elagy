import { Link } from "react-router-dom";
import "./Footer.css";
import { Facebook, Instagram, Music2 } from "lucide-react";

function Footer() {
  return (
    <footer className="footer-modern">

      <div className="footer-modern-container">

        {/* Logo */}
        <Link to="/" className="footer-modern-logo">
          <img src="/src/assets/logo.jpeg" alt="3elagy Logo" />
        </Link>

        {/* Links */}
        <ul className="footer-modern-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
        </ul>

        {/* Social */}
        <ul className="footer-modern-social">
          <li>
            <a href="https://www.facebook.com/share/1Zeza5DA3z/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
              <Facebook size={50}/>
            </a>
          </li>

          <li>
            <a href="https://www.instagram.com/3elagy_" target="_blank" rel="noopener noreferrer">
              <Instagram size={50}/>
            </a>
          </li>

          <li>
            <a href="https://www.tiktok.com/@3elagy" target="_blank" rel="noopener noreferrer">
              <Music2 size={50}/>
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <p className="footer-modern-copy">
          © 2025 3elagy. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;