import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db, auth } from "../services/firebase";

import {
collection,
addDoc,
serverTimestamp,
doc,
getDoc
} from "firebase/firestore";

import "./BloodEmergency.css";

function BloodEmergency(){

const [patientName,setPatientName] = useState("");
const [bloodType,setBloodType] = useState("");
const [units,setUnits] = useState("");
const [hospital,setHospital] = useState("");
const [city,setCity] = useState("");
const [phone,setPhone] = useState("");
const [notes,setNotes] = useState("");

/* -------------------------------
AUTO FILL USER PROFILE
--------------------------------*/

useEffect(()=>{

const fetchUserData = async () => {

try{

const user = auth.currentUser;

if(!user) return;

const userRef = doc(db,"users",user.uid);
const userSnap = await getDoc(userRef);

if(userSnap.exists()){

const data = userSnap.data();

setPatientName(data.name || "");
setCity(data.city || "");
setPhone(data.phone || "");

}

}catch(error){

console.log("Error fetching user profile:",error);

}

};

fetchUserData();

},[]);

/* -------------------------------
SUBMIT BLOOD REQUEST
--------------------------------*/

const submitRequest = async (e) => {

e.preventDefault();

try{

const user = auth.currentUser;

await addDoc(collection(db,"blood_requests"),{

user_id: user?.uid || null,

patient_name: patientName,
blood_type: bloodType,
units_requested: Number(units),

hospital_name: hospital,
city: city,
contact_number: phone,

additional_notes: notes,

status:"pending",

created_at: serverTimestamp()

});

alert("Blood request submitted successfully!");

setBloodType("");
setUnits("");
setHospital("");
setNotes("");

}catch(err){

console.log("Error submitting request:",err);

}

};

/* -------------------------------
UI
--------------------------------*/

return(

<>
<Navbar/>

<div className="emergency-page">

<div className="info-box">
ℹ️ Submit your blood request and we will notify nearby blood banks and donors.
</div>

<h1 className="portal-title">Blood Request Portal</h1>
<p className="portal-subtitle">Request blood to save lives</p>

<div className="form-card">

<h2>Submit Blood Request</h2>

<form className="blood-form" onSubmit={submitRequest}>

<label>Patient Name *</label>
<input
type="text"
value={patientName}
disabled
/>

<div className="form-row">

<div className="form-group">
<label>Blood Type *</label>
<select
value={bloodType}
onChange={(e)=>setBloodType(e.target.value)}
required
>
<option value="">Select blood type</option>
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

<div className="form-group">
<label>Units Needed *</label>
<input
type="number"
value={units}
onChange={(e)=>setUnits(e.target.value)}
required
/>
</div>

</div>

<label>Hospital Name *</label>
<input
type="text"
value={hospital}
onChange={(e)=>setHospital(e.target.value)}
required
/>


<label>Contact Number *</label>
<input
type="text"
value={phone}
disabled
/>

<label>Additional Notes</label>
<textarea
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

<button type="submit" className="submit-btn">
Submit Request
</button>

</form>

</div>

</div>

<Footer/>

</>

);

}

export default BloodEmergency;
