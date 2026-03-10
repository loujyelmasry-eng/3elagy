import "./CTA.css";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <h2>Ready to simplify your healthcare?</h2>
        <p>Join thousands of Egyptians using 3elagy for their healthcare needs</p>
        <Link className="cta-btn" to="/medicine-search">Start Searching →</Link>
      </div>
    </section>
  );
}