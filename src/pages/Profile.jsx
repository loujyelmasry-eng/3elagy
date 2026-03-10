import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Profile.css";
import { User, Mail, Phone, Droplet, FileText, TestTube, Activity } from "lucide-react";

function Profile() {
  return (
    <>
      <Navbar />

      <div className="profile-container">

        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={40}/>
          </div>

          <h2>My Profile</h2>
          <p>Your personal health dashboard</p>
        </div>


        <div className="profile-grid">

          {/* PERSONAL INFO */}
          <div className="profile-card">

            <div className="card-header">
              <h3>Personal Information</h3>
              <button className="edit-btn">Edit Profile</button>
            </div>

            <div className="info-row">
              <User size={18}/>
              <div>
                <span>Name</span>
                <p>Ahmed Mohamed</p>
              </div>
            </div>

            <div className="info-row">
              <Mail size={18}/>
              <div>
                <span>Email</span>
                <p>ahmed.mohamed@example.com</p>
              </div>
            </div>

            <div className="info-row">
              <Phone size={18}/>
              <div>
                <span>Phone</span>
                <p>+20 100 123 4567</p>
              </div>
            </div>

            <div className="info-row">
              <Droplet size={18}/>
              <div>
                <span>Blood Type</span>
                <p>A+</p>
              </div>
            </div>

          </div>


          {/* MEDICAL HISTORY */}
          <div className="profile-card">

            <h3>Medical History Timeline</h3>

            <div className="timeline">

              <div className="timeline-item">
                <TestTube size={18}/>
                <div>
                  <span>Lab Test</span>
                  <p>Complete Blood Count</p>
                </div>

                <div className="timeline-status">
                  <p>2024-12-10</p>
                  <span className="status normal">Normal</span>
                </div>
              </div>


              <div className="timeline-item">
                <FileText size={18}/>
                <div>
                  <span>Prescription</span>
                  <p>Panadol Extra - 20 tablets</p>
                </div>

                <div className="timeline-status">
                  <p>2024-12-05</p>
                  <span className="status completed">Completed</span>
                </div>
              </div>


              <div className="timeline-item">
                <TestTube size={18}/>
                <div>
                  <span>Lab Test</span>
                  <p>Lipid Profile</p>
                </div>

                <div className="timeline-status">
                  <p>2024-11-28</p>
                  <span className="status normal">Normal</span>
                </div>
              </div>


              <div className="timeline-item">
                <Activity size={18}/>
                <div>
                  <span>Checkup</span>
                  <p>Annual Health Checkup</p>
                </div>

                <div className="timeline-status">
                  <p>2024-11-15</p>
                  <span className="status completed">Completed</span>
                </div>
              </div>

            </div>

          </div>


          {/* MEDICAL RECORDS */}
          <div className="profile-card">

            <div className="card-header">
              <h3>My Medical Records</h3>
              <span className="view-all">View All Records</span>
            </div>

            <div className="record">
              <FileText size={18}/>
              <div>
                <p>Blood Test Results - Nov 2024</p>
                <span>2024-11-28 · 2.4 MB</span>
              </div>
            </div>

            <div className="record">
              <FileText size={18}/>
              <div>
                <p>X-Ray Report - Oct 2024</p>
                <span>2024-10-15 · 1.8 MB</span>
              </div>
            </div>

            <div className="record">
              <FileText size={18}/>
              <div>
                <p>Prescription - Sept 2024</p>
                <span>2024-09-20 · 0.5 MB</span>
              </div>
            </div>

          </div>


          {/* RECENT REQUESTS */}
          <div className="profile-card">

            <h3>Recent Requests</h3>

            <div className="request">
              <div>
                <span>Medicine Search</span>
                <p>Augmentin 1g</p>
              </div>

              <div className="request-status">
                <span>2024-12-12</span>
                <label className="found">Found</label>
              </div>
            </div>

            <div className="request">
              <div>
                <span>Lab Booking</span>
                <p>Thyroid Profile</p>
              </div>

              <div className="request-status">
                <span>2024-12-10</span>
                <label className="pending">Pending</label>
              </div>
            </div>

            <div className="request">
              <div>
                <span>Pharmacy</span>
                <p>El Ezaby - Nasr City</p>
              </div>

              <div className="request-status">
                <span>2024-12-08</span>
                <label className="visited">Visited</label>
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;