import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Pill, MapPin, Droplet, TestTube } from "lucide-react";
import { Link } from "react-router-dom";
import "./Services.css";

function Services() {
  const services = [
    {
      icon: <Pill size={32} />,
      title: "Medicine Search",
      desc: "Find medications and check real-time availability in nearby pharmacies.",
      link: "/medicine-search",
    },
    {
      icon: <MapPin size={32} />,
      title: "Pharmacy Locator",
      desc: "Locate pharmacies near you and view opening hours and available medicines.",
      link: "/pharmacies",
    },
    {
      icon: <Droplet size={32} />,
      title: "Blood Requests",
      desc: "Request blood donations quickly and connect with hospitals and donors.",
      link: "/blood-requests",
    },
    {
      icon: <TestTube size={32} />,
      title: "Lab Tests",
      desc: "Book lab tests and receive digital results online.",
      link: "/lab-tests",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="services-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Everything you need for better healthcare</p>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">

            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>

                <h3>{service.title}</h3>

                <p>{service.desc}</p>

                <Link to={service.link} className="service-btn">
                  Learn More →
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;