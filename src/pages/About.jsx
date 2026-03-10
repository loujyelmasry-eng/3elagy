import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

import { Heart, Target, Eye, Shield, Users, Zap } from "lucide-react";

function About() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="about-header">
        <div className="container">
          <h1>About 3elagy</h1>
          <p>Transforming Healthcare in Egypt</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mission">
        <div className="container">

          <div className="mission-grid">

            <div className="mission-card">
              <div className="icon blue">
                <Target size={28} />
              </div>

              <h3>Our Mission</h3>

              <p>
                To make healthcare accessible, reliable, and simple for everyone
                in Egypt. We believe that finding medicine, booking tests, and
                managing health should be effortless.
              </p>
            </div>

            <div className="mission-card">
              <div className="icon gold">
                <Eye size={28} />
              </div>

              <h3>Our Vision</h3>

              <p>
                A digital healthcare ecosystem where every Egyptian has instant
                access to medicines, labs, and vital health services.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">

          <h2>Our Values</h2>

          <div className="values-grid">

            <div className="value-card">
              <div className="value-icon">
                <Shield size={24} />
              </div>

              <h4>Trust</h4>

              <p>
                Building confidence through transparency and reliability
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Users size={24} />
              </div>

              <h4>Accessibility</h4>

              <p>
                Making healthcare services available to all
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Zap size={24} />
              </div>

              <h4>Innovation</h4>

              <p>
                Using technology to improve health outcomes
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container">

          <div className="story-box">

            <div className="heart">
              <Heart size={40} strokeWidth={2} />
            </div>

            <h2>Built for Egypt, by Egyptians</h2>

            <p>
              3elagy was born from a simple observation: finding medicine
              shouldn't be complicated. We're building a healthcare platform
              that puts patients first, making it easier to find medications,
              locate pharmacies, book lab tests, and manage health records —
              all in one place.
            </p>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;