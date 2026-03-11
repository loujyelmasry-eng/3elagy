import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Pharmacies.css";

function Pharmacies() {

const location = useLocation();
const params = new URLSearchParams(location.search);
const medicineQuery = params.get("medicine");

const [pharmacies,setPharmacies] = useState([]);
const [userLocation,setUserLocation] = useState(null);


// Fetch pharmacies from Firebase
useEffect(()=>{

const fetchPharmacies = async () => {

const querySnapshot = await getDocs(collection(db,"medicines"));

const data = querySnapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));

const filtered = medicineQuery
  ? data.filter(m =>
      m.medicine_name &&
      m.medicine_name.toLowerCase().includes(medicineQuery.toLowerCase())
    )
  : data;

console.log("Filtered pharmacies:", filtered);

setPharmacies(filtered);

console.log("Pharmacies loaded:", filtered.length);

};

fetchPharmacies();

},[medicineQuery]);



// Distance calculation
function getDistance(lat1, lon1, lat2, lon2){

const R = 6371;

const dLat = (lat2 - lat1) * Math.PI / 180;
const dLon = (lon2 - lon1) * Math.PI / 180;

const a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(lat1 * Math.PI/180) *
Math.cos(lat2 * Math.PI/180) *
Math.sin(dLon/2) * Math.sin(dLon/2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return R * c;

}



// Find nearest pharmacies
const findNearby = () => {

if(!navigator.geolocation){
alert("Geolocation not supported");
return;
}

navigator.geolocation.getCurrentPosition((position)=>{

const lat = position.coords.latitude;
const lng = position.coords.longitude;

setUserLocation([lat,lng]);

const sorted = [...pharmacies].sort((a,b)=>{

const distA = getDistance(lat,lng,a.lat,a.lng);
const distB = getDistance(lat,lng,b.lat,b.lng);

return distA - distB;

});

setPharmacies(sorted);

});

};



return(

<>
<Navbar/>

<div className="pharmacy-container">

<h2 className="pharmacy-title">Find Pharmacies</h2>
<p className="pharmacy-subtitle">Locate pharmacies near you</p>

{medicineQuery && (
<p className="medicine-filter">
Showing pharmacies with: <strong>{medicineQuery}</strong>
</p>
)}


<div className="nearby-wrapper">

<button className="nearby-btn" onClick={findNearby}>
📍 Find Pharmacies Near Me
</button>

</div>



{/* Pharmacies List */}

<div className="pharmacy-grid">

{pharmacies.length === 0 ? (

<p className="no-results">
No pharmacies found for this medicine.
</p>

) : (

pharmacies.map((ph,index)=>(

<div className="pharmacy-card" key={index}>

<h3>{ph.pharmacy}</h3>

<p className="address">
<MapPin size={16}/> {ph.city}
</p>

<p><strong>Medicine:</strong> {ph.medicine_name}</p>
<p><strong>Dosage:</strong> {ph.dosage}</p>
<p><strong>Price:</strong> {ph.price_egp} EGP</p>
<p><strong>Stock:</strong> {ph.stock}</p>

<div className="buttons">

<a
href={ph.google_maps_directions}
target="_blank"
rel="noreferrer"
>

<button className="direction-btn">
📍 Get Directions
</button>

</a>

</div>

</div>

))

)}

</div>

</div>

<Footer/>

</>

);

}

export default Pharmacies;