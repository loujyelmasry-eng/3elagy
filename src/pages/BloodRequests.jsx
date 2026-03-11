import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./BloodRequests.css";

function BloodRequests(){

const [banks,setBanks] = useState([]);
const [selectedBloodType,setSelectedBloodType] = useState("");

useEffect(()=>{

const fetchBanks = async () => {

const querySnapshot = await getDocs(collection(db,"blood banks"));

const data = querySnapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));

setBanks(data);

};

fetchBanks();

},[]);


return(

<>
<Navbar/>

<div className="blood-container">

<h2 className="blood-title">Available Blood Banks</h2>

<div className="blood-filter">

<select
value={selectedBloodType}
onChange={(e)=>setSelectedBloodType(e.target.value)}
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


<div className="blood-grid">

{banks
.filter(bank =>
selectedBloodType === "" || bank.blood_type === selectedBloodType
)
.map((bank,index)=>(

<div className="blood-card" key={index}>

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
Get Directions
</button>

</a>

</div>

))}

</div>

</div>

<Footer/>

</>

);

}

export default BloodRequests;