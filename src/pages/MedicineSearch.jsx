import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MedicineSearch.css";
import { Search, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function MedicineSearch() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "medicines"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const displayedMedicines = medicines.filter((med) =>
    med.medicine_name?.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <>
      <Navbar />

      <div className="medicine-container">
        <h2>Search Medicines</h2>
        <p>Find medications and check availability</p>

        <div className="search-box">
          <Search size={18} className="search-icon" />

          <input
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="button">Search</button>
        </div>

        <div className="medicine-results">
          {loading ? (
            <p>Loading medicines...</p>
          ) : displayedMedicines.length > 0 ? (
            displayedMedicines.map((med) => (
              <div className="medicine-card" key={med.id}>
                <div className="medicine-header">
                  <Pill size={20} className="pill-icon" />
                  <h3>{med.medicine_name}</h3>
                </div>

                <p className="medicine-desc">
                  {med.active_ingredient} - {med.category}
                </p>

                <div className="pharmacy-list">
                  <strong>Available at:</strong>
                  <ul>
                    <li>{med.pharmacy}</li>
                  </ul>

                  <p><strong>City:</strong> {med.city}</p>
                  <p><strong>Dosage:</strong> {med.dosage}</p>
                  <p><strong>Price:</strong> {med.price_egp} EGP</p>
                  <p><strong>Stock:</strong> {med.stock}</p>
                </div>

                <button
                  className="view-btn"
                  onClick={() =>
                    navigate(`/pharmacies?medicine=${encodeURIComponent(med.medicine_name)}`)
                  }
                >
                  View Pharmacies
                </button>
              </div>
            ))
          ) : (
            <p>No medicines found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MedicineSearch;