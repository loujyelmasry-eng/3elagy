import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./LabTests.css";
import { useNavigate } from "react-router-dom";

function LabTests() {

const [labs, setLabs] = useState([]);
const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
const navigate = useNavigate();
useEffect(() => {

const fetchLabs = async () => {

const querySnapshot = await getDocs(collection(db,"labs"));

const data = querySnapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));

setLabs(data);
setResults(data);

};

fetchLabs();

},[]);


// SEARCH FUNCTION
const handleSearch = () => {

const filtered = labs.filter(lab =>
lab.test_name &&
lab.test_name.toLowerCase().includes(search.toLowerCase())
);

setResults(filtered);

};


return(

<>
<Navbar/>

<div className="lab-container">

<h2 className="lab-title">Find Lab Tests</h2>

<p className="lab-subtitle">
Search for a test and see available labs
</p>


{/* SEARCH BOX */}

<div className="search-box">

<input
type="text"
placeholder="Search for a test (e.g. CBC)"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button onClick={handleSearch} className="search-btn">
Search
</button>

</div>



{/* RESULTS */}

<div className="lab-grid">

{results.length === 0 ? (

<p className="no-results">
loading Lab tests....
</p>

) : (

results.map((lab)=>(

<div className="lab-card" key={lab.id}>

<h3 className="test-title">{lab.test_name}</h3>

<span className="lab-name">
{lab.lab_name}
</span>

<p><strong>Price:</strong> {lab.price_egp} EGP</p>

<p><strong>Rating:</strong> ⭐ {lab.rating}</p>

<p>
<strong>Home Sample:</strong>
{lab.home_sample_available ? " Yes" : " No"}
</p>

<div className="lab-buttons">

<button
className="location-btn"
onClick={() => window.open(lab.google_maps_link, "_blank")}
>
📍 View Location
</button>



<button
className="reserve-btn"
onClick={()=>navigate(`/lab-booking?test=${lab.test_name}&lab=${lab.lab_name}`)}
>
Reserve Test
</button>

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

export default LabTests;