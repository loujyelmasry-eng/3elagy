import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact-header">

        <h1>Contact & Support</h1>
        <p>We're here to help</p>

      </section>

      <div className="contact-grid">

        <ContactForm />
        <FAQ />

      </div>

      <Footer />
    </>
  );
}

export default Contact;