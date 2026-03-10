import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pharmaciesData from "../data/pharmaciesData";
import { MapPin, Phone, Clock } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Pharmacies.css";

function Pharmacies(){

const location = useLocation();

const params = new URLSearchParams(location.search);
const medicineQuery = params.get("medicine");

const [search,setSearch] = useState("");
const [pharmacies,setPharmacies] = useState(pharmaciesData);
const [userLocation,setUserLocation] = useState(null);

const customIcon = new L.Icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
iconSize:[32,32]
});

function isOpen(hours){

if(hours.includes("24/7")) return true;

const now = new Date();
const currentHour = now.getHours();

const [open,close] = hours.split("-");

return currentHour >= parseInt(open) && currentHour < parseInt(close);

}

const handleSearch = () => {

const results = pharmaciesData.filter(p =>
p.medicines.some(m =>
m.toLowerCase().includes(search.toLowerCase())
)
);

setPharmacies(results);

};
function getDistance(lat1, lon1, lat2, lon2){

  const R = 6371; // Earth radius in km
  
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

  const findNearby = () => {

    if(!navigator.geolocation){
    alert("Geolocation not supported");
    return;
    }
    
    navigator.geolocation.getCurrentPosition((position)=>{
    
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    setUserLocation([lat,lng]);
    
    // sort pharmacies by distance
    const sorted = [...pharmaciesData].sort((a,b)=>{
    
    const distA = getDistance(lat,lng,a.lat,a.lng);
    const distB = getDistance(lat,lng,b.lat,b.lng);
    
    return distA - distB;
    
    });
    
    setPharmacies(sorted);
    
    });
    
    };

useEffect(()=>{

if(medicineQuery){

const filtered = pharmaciesData.filter(ph =>
ph.medicines.some(m =>
m.toLowerCase().includes(medicineQuery.toLowerCase())
)
);

setPharmacies(filtered);

}

},[medicineQuery]);

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

<div className="map-box">

<MapContainer
center={userLocation || [30.0444,31.2357]}
zoom={7}
style={{height:"400px",width:"100%"}}
>

<TileLayer
attribution="&copy; OpenStreetMap contributors"
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{pharmacies.map((ph,index)=>(

<Marker
key={index}
position={[ph.lat,ph.lng]}
icon={customIcon}
>

<Popup>

<strong>{ph.name}</strong>
<br/>
{ph.address}
<br/>
📞 {ph.phone}

</Popup>

</Marker>

))}

{userLocation && (

<Marker position={userLocation}>

<Popup>
You are here
</Popup>

</Marker>

)}

</MapContainer>

</div>

<div className="pharmacy-grid">

{pharmacies.map((ph,index)=>(

<div className="pharmacy-card" key={index}>

{ph.hours.includes("24/7") && (
<span className="badge">Open 24/7</span>
)}

<h3>{ph.name}</h3>

<p className="address">
<MapPin size={16}/> {ph.address}
</p>

<p className="phone">
<Phone size={16}/> {ph.phone}
</p>

<p className="hours">
<Clock size={16}/> {ph.hours}
</p>

<p className="status">

<span className={isOpen(ph.hours) ? "dot open" : "dot closed"}></span>

{isOpen(ph.hours) ? "Open Now" : "Closed"}

</p>

<div className="buttons">

<a href={`tel:${ph.phone}`}>
<button className="call-btn">
📞 Call
</button>
</a>

<a
href={`https://www.google.com/maps/dir/?api=1&destination=${ph.lat},${ph.lng}`}
target="_blank"
rel="noreferrer"
>
<button className="direction-btn">
📍 Get Directions
</button>
</a>

</div>

</div>

))}

</div>

</div>

<Footer/>
</>

);

}

export default Pharmacies;