import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./BloodRequests.css";

function BloodRequests() {

  const [bloodBanks, setBloodBanks] = useState([]);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ---------------- FETCH BLOOD BANKS ---------------- */

  useEffect(() => {

    const fetchBloodBanks = async () => {

      try {

        const snapshot = await getDocs(collection(db, "blood banks"));

        const banks = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setBloodBanks(banks);

      } catch (error) {

        console.error("Error fetching blood banks:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchBloodBanks();

  }, []);


  /* ---------------- FILTER BLOOD BANKS ---------------- */

  const filteredBanks = bloodBanks.filter(bank => {

    if (!selectedBloodType) return true;

    return bank.blood_type === selectedBloodType;

  });


  /* ---------------- UI ---------------- */

  return (
    <>
      <Navbar />

      <div className="blood-container">

        <h2 className="blood-title">Available Blood Banks</h2>

        {/* ACTIONS (Emergency + Filter) */}

        <div className="blood-actions">

          <button
            className="request-btn"
            onClick={() => navigate("/blood-emergency")}
          >
            🩸 Request Emergency Blood
          </button>

          <div className="blood-filter">

            <select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
            >

              <option value="">All Blood Types</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>

            </select>

          </div>

        </div>


        {/* BLOOD BANK GRID */}

        <div className="blood-grid">

          {loading && (
            <p className="loading">Loading blood banks...</p>
          )}

          {!loading && filteredBanks.length === 0 && (
            <p className="no-results">
              No blood banks found for this blood type.
            </p>
          )}

          {!loading && filteredBanks.map(bank => (

            <div className="blood-card" key={bank.id}>

              <h3 className="blood-name">{bank.blood_bank_name}</h3>

              <p><strong>Blood Type:</strong> {bank.blood_type}</p>
              <p><strong>Component:</strong> {bank.component}</p>
              <p><strong>City:</strong> {bank.city}</p>
              <p><strong>Units Available:</strong> {bank.units_available}</p>
              <p><strong>Price:</strong> {bank.price_egp} EGP</p>

              <a
                href={bank.google_maps_link}
                target="_blank"
                rel="noreferrer"
              >

                <button className="direction-btn">
                  📍 Get Directions
                </button>

              </a>

            </div>

          ))}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default BloodRequests;
