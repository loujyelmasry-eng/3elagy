import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BloodRequests.css";
import { Droplet, Info } from "lucide-react";

function BloodRequests() {
  return (
    <>
      <Navbar />

      <div className="blood-container">

        {/* HEADER */}

        <div className="blood-header">

          <div className="blood-icon">
            <Droplet size={32} />
          </div>

          <h1>Blood Request Portal</h1>

          <p>Request blood to save lives</p>

        </div>

        {/* INFO BOX */}

        <div className="info-box">

          <Info size={20} />

          <div>
            <h4>Important Information</h4>
            <p>
              Submit your blood request and we will notify hospitals, blood banks,
              and registered donors in your area. Please ensure all information
              is accurate. Emergency requests are prioritized.
            </p>
          </div>

        </div>

        {/* FORM */}

        <div className="blood-form">

          <h2>Submit Blood Request</h2>

          <form>

            <label>Patient Name *</label>
            <input type="text" placeholder="Patient name" />

            <div className="form-row">

              <div>
                <label>Blood Type *</label>

                <select>
                  <option>Select blood type</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div>
                <label>Units Needed *</label>
                <input type="number" placeholder="Units" />
              </div>

            </div>

            <label>Hospital Name *</label>
            <input type="text" placeholder="Hospital name where blood is needed" />

            <label>City *</label>
            <input type="text" placeholder="City or location" />

            <label>Contact Number *</label>
            <input type="text" placeholder="+20 XXX XXX XXXX" />

            <small>This number will be shared with potential donors</small>

            <label>Additional Notes</label>
            <textarea
              placeholder="Any additional information (urgency level, visiting hours, etc.)"
            />

            <button className="submit-btn">
              <Droplet size={18} />
              Submit Request
            </button>

          </form>

        </div>

        {/* BOTTOM INFO */}

        <div className="blood-footer-card">

          <Droplet size={28} />

          <h3>Every Request Matters</h3>

          <p>
            Your blood request will be shared with verified hospitals,
            blood banks, and registered donors. We work to connect patients
            with donors as quickly as possible to save lives.
          </p>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default BloodRequests;