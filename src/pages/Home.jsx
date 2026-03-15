import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./Home.css";

/* Fix Leaflet default icon */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

/* Custom icons */
const pharmacyIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
  iconSize: [35, 35]
});

const labIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2784/2784487.png",
  iconSize: [35, 35]
});

const bloodIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/893/893529.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30]
});

export default function Home() {

  const [pharmacies, setPharmacies] = useState([]);
  const [labs, setLabs] = useState([]);
  const [banks, setBanks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
  
    const user = auth.currentUser;
  
    if (!user) {
      navigate("/login");
    }
  
  }, []);
  /* Fetch data from Firestore */

  useEffect(() => {

    const fetchData = async () => {

      try {

        const pharmacySnap = await getDocs(collection(db, "medicines"));
        const labSnap = await getDocs(collection(db, "labs"));
        const bankSnap = await getDocs(collection(db, "blood banks"));

        setPharmacies(
          pharmacySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );

        setLabs(
          labSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );

        setBanks(
          bankSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        );

      } catch (error) {

        console.log("Firestore error:", error);

      }

    };

    fetchData();

  }, []);

  return (

    <div className="page">

      <Navbar />
      <Hero />
      <ServicesSection />

      {/* MAP SECTION */}

      <div style={{ maxWidth: "900px", margin: "60px auto" }}>

        <h2 style={{ textAlign: "center" }}>Map</h2>

        {/* FILTER BUTTONS */}
        <div className="map-filters">

<button
className={`filter-btn ${filter==="all" ? "active" : ""}`}
onClick={()=>setFilter("all")}
>
All
</button>

<button
className={`filter-btn ${filter==="pharmacy" ? "active" : ""}`}
onClick={()=>setFilter("pharmacy")}
>
Pharmacies
</button>

<button
className={`filter-btn ${filter==="labs" ? "active" : ""}`}
onClick={()=>setFilter("labs")}
>
Labs
</button>

<button
className={`filter-btn ${filter==="banks" ? "active" : ""}`}
onClick={()=>setFilter("banks")}
>
Blood Banks
</button>

</div>


        {/* MAP */}

        <MapContainer
          center={[30.0444, 31.2357]}
          zoom={12}
          style={{
            height: "450px",
            width: "100%",
            borderRadius: "12px"
          }}
        >

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* PHARMACIES */}

          {(filter === "all" || filter === "pharmacy") &&
            pharmacies.map((ph) => (
              ph.lat && ph.lng && (
                <Marker
                  key={ph.id}
                  position={[Number(ph.lat), Number(ph.lng)]}
                  icon={pharmacyIcon}
                >
                  <Popup>
                    <strong>{ph.pharmacy}</strong>
                    <br />
                    {ph.city}
                    <br />
                    <a
                      href={ph.google_maps_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Popup>
                </Marker>
              )
            ))
          }

          {/* LABS */}

          {(filter === "all" || filter === "labs") &&
            [...new Map(labs.map(l => [l.lab_name, l])).values()].map((lab) => (
              lab.lat && lab.lng && (
                <Marker
                  key={lab.id}
                  position={[Number(lab.lat), Number(lab.lng)]}
                  icon={labIcon}
                >
                  <Popup>
                    <strong>{lab.lab_name}</strong>
                    <br />
                    {lab.city}
                    <br />
                    <a
                      href={lab.google_maps_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Popup>
                </Marker>
              )
            ))
          }

          {/* BLOOD BANKS */}

          {(filter === "all" || filter === "banks") &&
            banks.map((bank) => (
              bank.lat && bank.lng && (
                <Marker
                  key={bank.id}
                  position={[Number(bank.lat), Number(bank.lng)]}
                  icon={bloodIcon}
                >
                  <Popup>
                    <strong>{bank.blood_bank_name}</strong>
                    <br />
                    {bank.city}
                    <br />
                    <a
                      href={bank.google_maps_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Popup>
                </Marker>
              )
            ))
          }

        </MapContainer>

      </div>

      <CTA />
      <Footer />

    </div>

  );

}