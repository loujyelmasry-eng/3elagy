import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="page">
      <Navbar />
      <Hero />
      <ServicesSection />
      <CTA />
      <Footer />
    </div>
  );
}