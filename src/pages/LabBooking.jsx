import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LabBooking.css";

import { auth, db } from "../services/firebase";

import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  getDoc
} from "firebase/firestore";

function LabBooking() {

const location = useLocation();
const navigate = useNavigate();

const params = new URLSearchParams(location.search);

const test = params.get("test");
const labFromUrl = params.get("lab");

const slots = [
"09:00","09:30","10:00","10:30",
"11:00","11:30","12:00","12:30",
"13:00","13:30","14:00","14:30",
"15:00","15:30","16:00","16:30",
"17:00","17:30","18:00","18:30",
"19:00","19:30","20:00"
];

const [availableSlots,setAvailableSlots] = useState(slots);

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [lab,setLab] = useState(labFromUrl || "");
const [date,setDate] = useState("");
const [time,setTime] = useState("");
const [homeSample,setHomeSample] = useState(false);


/*
AUTO FILL USER INFO FROM FIRESTORE
*/

useEffect(()=>{

const fetchUserData = async () => {

const user = auth.currentUser;

if(!user) return;

try{

const userRef = doc(db,"users",user.uid);
const userSnap = await getDoc(userRef);

if(userSnap.exists()){

const data = userSnap.data();

setName(data.name || "");
setPhone(data.phone || "");

}

}catch(error){

console.log("Error loading user data:",error);

}

};

fetchUserData();

},[]);


/*
GET RESERVED SLOTS
*/

useEffect(()=>{

const fetchReservedSlots = async ()=>{

if(!lab || !date) return;

const selectedDate = Timestamp.fromDate(new Date(date));

const q = query(
collection(db,"lab_requests"),
where("lab_name","==",lab),
where("test_name","==",test),
where("date","==",selectedDate)
);

const snapshot = await getDocs(q);

const reservedTimes = snapshot.docs.map(
doc => doc.data().time
);

const freeSlots = slots.filter(
slot => !reservedTimes.includes(slot)
);

setAvailableSlots(freeSlots);

};

fetchReservedSlots();

},[lab,date,test]);


/*
SUBMIT BOOKING
*/

const handleSubmit = async (e)=>{

e.preventDefault();

const user = auth.currentUser;

if(!user){
alert("Please login first");
return;
}

if(!time){
alert("Please select a time slot");
return;
}

const selectedDate = Timestamp.fromDate(new Date(date));

const q = query(
collection(db,"lab_requests"),
where("lab_name","==",lab),
where("test_name","==",test),
where("date","==",selectedDate),
where("time","==",time)
);

const snapshot = await getDocs(q);

if(!snapshot.empty){
alert("❌ This time slot is already reserved");
return;
}

await addDoc(collection(db,"lab_requests"),{

user_id:user.uid,
patient_name:name,
phone:phone,
lab_name:lab,
test_name:test,
date:selectedDate,
time:time,
home_sample:homeSample,
status:"pending",
created_at:Timestamp.now()

});


/*
REDIRECT TO CONFIRMATION PAGE
*/

navigate("/booking-confirmation",{

state:{
name,
phone,
lab,
test,
date,
time,
homeSample
}

});

};


return(

<>
<Navbar/>

<div className="booking-container">

<div className="booking-header">

<div className="booking-icon">🧪</div>

<h1>Book Lab Test</h1>

<p className="selected-test">{test}</p>

</div>


<div className="booking-card">

<form className="booking-form" onSubmit={handleSubmit}>

<label>Patient Name *</label>

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
readOnly={name !== ""}
/>


<label>Phone Number *</label>

<input
type="tel"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
readOnly={phone !== ""}
/>


<label>Lab *</label>

<input
type="text"
value={lab}
readOnly
/>


<label>Preferred Date *</label>

<input
type="date"
min={new Date().toISOString().split("T")[0]}
value={date}
onChange={(e)=>setDate(e.target.value)}
required
/>


<label>Preferred Time *</label>

<div className="time-slots">

{availableSlots.map((slot)=>(

<button
type="button"
key={slot}
className={`slot-btn ${time === slot ? "selected" : ""}`}
onClick={()=>setTime(slot)}
>
{slot}
</button>

))}

</div>


<label>Home Collection</label>

<select
value={homeSample ? "Yes" : "No"}
onChange={(e)=>setHomeSample(e.target.value === "Yes")}
>

<option>No</option>
<option>Yes</option>

</select>


<button type="submit" className="confirm-btn">

Confirm Booking

</button>

</form>

</div>

</div>

<Footer/>

</>

);

}

export default LabBooking;