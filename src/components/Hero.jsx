import "./Hero.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner container">
        <h1>Your Health, Our Mission</h1>
        <p>Find medicines, labs, ,Blood requests and healthcare services across Egypt with ease</p>

        <div className="hero-actions">
          <Link className="btn primary" to="/medicine-search">Get Started →</Link>
          <Link className="btn outline" to="/about">Learn More</Link>
        </div>

        <div className="hero-features">
          <div className="feature">
            <div className="feature-icon">🛡️</div>
            <div className="feature-title">Verified</div>
            <div className="feature-sub">All pharmacies verified</div>
          </div>

          <div className="feature">
            <div className="feature-icon">⏱️</div>
            <div className="feature-title">Fast</div>
            <div className="feature-sub">Real-time availability</div>
          </div>

          <div className="feature">
            <div className="feature-icon">👥</div>
            <div className="feature-title">Trusted</div>
            <div className="feature-sub">100,000+ users</div>
          </div>
        </div>
      </div>
    </section>
  );
}