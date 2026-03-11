import "./ServicesSection.css";
import { Link } from "react-router-dom";

const services = [
  { title: "Medicine Search", desc: "Find medications and alternatives with real-time availability", to: "/medicine-search", icon: "💊" },
  // { title: "Pharmacy Locator", desc: "Locate nearby pharmacies with stock information", to: "/pharmacies", icon: "📍" },
  { title: "Blood Requests", desc: "Request or donate blood quickly and safely", to: "/blood-requests", icon: "🩸" },
  { title: "Lab Tests", desc: "Book lab tests and view results online", to: "/lab-tests", icon: "🧪" },
  { title: "Medical Records", desc: "Access your health history anytime, anywhere", to: "/profile", icon: "📄" },
  { title: "24/7 Support", desc: "Get help whenever you need it", to: "/contact", icon: "🎧" },
];

export default function ServicesSection() {
  return (
    <section className="services">
      <div className="container">
        <h2>Our Services</h2>
        <p className="subtitle">Everything you need for better healthcare</p>

        <div className="grid">
          {services.map((s) => (
            <div className="card" key={s.title}>
              <div className="icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link className="learn" to={s.to}>Learn More →</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}