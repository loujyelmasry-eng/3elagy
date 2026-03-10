import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MedicineSearch.css";
import { Search, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import pharmaciesData from "../data/pharmaciesData";

function MedicineSearch(){

const navigate = useNavigate();

const [search,setSearch] = useState("");

const medicines = [...new Set(
  pharmaciesData.flatMap(p => p.medicines)
  )].map(med => ({
  
  name:med,
  description:"Available in partner pharmacies",
  
  pharmacies:pharmaciesData
  .filter(p => p.medicines.includes(med))
  .map(p => p.name)
  
  }));
const filtered = medicines.filter(m =>
m.name.toLowerCase().includes(search.toLowerCase())
);

return(

<>
<Navbar/>

<div className="medicine-container">

<h2>Search Medicines</h2>

<p>Find medications and check availability</p>

<div className="search-box">

<Search size={18} className="search-icon"/>

<input
placeholder="Search medicines..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button>
Search
</button>

</div>

<div className="medicine-results">

{filtered.map((med,index)=>(

<div className="medicine-card" key={index}>

<div className="medicine-header">

<Pill size={20} className="pill-icon"/>

<h3>{med.name}</h3>

</div>

<p className="medicine-desc">
{med.description}
</p>

<div className="pharmacy-list">

<strong>Available at:</strong>

<ul>

{med.pharmacies.map((p,i)=>(
<li key={i}>{p}</li>
))}

</ul>

</div>

<button
className="view-btn"
onClick={()=>navigate(`/pharmacies?medicine=${med.name}`)}
>

View Pharmacies

</button>

</div>

))}

</div>

</div>

<Footer/>

</>

);

}

export default MedicineSearch;