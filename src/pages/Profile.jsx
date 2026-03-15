import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Profile.css";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
doc,
getDoc,
updateDoc,
collection,
query,
where,
getDocs
} from "firebase/firestore";

function Profile() {

const [loading,setLoading] = useState(true);
const [user,setUser] = useState(null);
const [userData,setUserData] = useState(null);

const [bookings,setBookings] = useState([]);
const [bloodRequests,setBloodRequests] = useState([]);
const [allRequests,setAllRequests] = useState([]);

const [editMode,setEditMode] = useState(false);

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [bloodType,setBloodType] = useState("");
const [age,setAge] = useState("");

/* AUTH LISTENER */

useEffect(()=>{

const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{

if(!firebaseUser){
setLoading(false);
return;
}

setUser(firebaseUser);

/* USER PROFILE */

const userRef = doc(db,"users",firebaseUser.uid);
const userSnap = await getDoc(userRef);

if(userSnap.exists()){

const data = userSnap.data();

setUserData(data);
setName(data.name || "");
setPhone(data.phone || "");
setBloodType(data.bloodType || "");
setAge(data.age || "");

}

/* LAB BOOKINGS */

const labQuery = query(
collection(db,"lab_requests"),
where("user_id","==",firebaseUser.uid)
);

const labSnap = await getDocs(labQuery);

const bookingData = labSnap.docs.map(doc=>({
id:doc.id,
type:"lab",
...doc.data()
}));

setBookings(bookingData);

/* BLOOD REQUESTS */

const bloodQuery = query(
collection(db,"blood_requests"),
where("user_id","==",firebaseUser.uid)
);

const bloodSnap = await getDocs(bloodQuery);

const bloodData = bloodSnap.docs.map(doc=>({
id:doc.id,
type:"blood",
...doc.data()
}));

setBloodRequests(bloodData);

/* MERGE REQUESTS */

const merged = [...bookingData,...bloodData];

merged.sort((a,b)=>{

const aTime = a.created_at?.seconds || 0;
const bTime = b.created_at?.seconds || 0;

return bTime - aTime;

});

setAllRequests(merged);

setLoading(false);

});

return ()=>unsubscribe();

},[]);


/* SAVE PROFILE */

const saveProfile = async ()=>{

await updateDoc(doc(db,"users",user.uid),{
name,
phone,
bloodType,
age
});

setUserData({
...userData,
name,
phone,
bloodType,
age
});

setEditMode(false);

};


/* CANCEL BOOKING */

const cancelBooking = async(id)=>{

await updateDoc(doc(db,"lab_requests",id),{
status:"cancelled"
});

setBookings(prev =>
prev.map(b =>
b.id === id ? {...b,status:"cancelled"} : b
)
);

};


/* STATUS STYLE */

const getStatusClass = (status)=>{

if(status==="pending") return "pending";
if(status==="completed") return "completed";
if(status==="approved") return "completed";
if(status==="cancelled") return "cancelled";

return "";

};


/* LOADING */

if(loading){

return(
<>
<Navbar/>
<div style={{padding:"40px",textAlign:"center"}}>
Loading profile...
</div>
<Footer/>
</>
);

}


return(

<>
<Navbar/>

<div className="profile-page">

{/* HEADER */}

<div className="profile-header">

<div className="avatar">
{userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
</div>

<h2>Hi, {userData?.name || "User"}</h2>

<p>Your personal health dashboard</p>

</div>


<div className="profile-grid">

{/* LEFT SIDE */}

<div className="profile-left">

<div className="card">

<div className="card-header">

<h3>Personal Information</h3>

<button
className="edit-btn"
onClick={()=>setEditMode(!editMode)}
>
{editMode ? "Cancel" : "Edit Profile"}
</button>

</div>


<div className="info-row">

<span>Name</span>

{editMode ? (
<input value={name} onChange={(e)=>setName(e.target.value)}/>
) : (
<p>{userData?.name}</p>
)}

</div>


<div className="info-row">

<span>Email</span>
<p>{userData?.email}</p>

</div>


<div className="info-row">

<span>Phone</span>

{editMode ? (
<input value={phone} onChange={(e)=>setPhone(e.target.value)}/>
) : (
<p>{userData?.phone}</p>
)}

</div>


<div className="info-row">

<span>Blood Type</span>

{editMode ? (
<input value={bloodType} onChange={(e)=>setBloodType(e.target.value)}/>
) : (
<p>{userData?.bloodType}</p>
)}

</div>


<div className="info-row">

<span>Age</span>

{editMode ? (
<input value={age} onChange={(e)=>setAge(e.target.value)}/>
) : (
<p>{userData?.age}</p>
)}

</div>


{editMode && (
<button className="save-btn" onClick={saveProfile}>
Save Changes
</button>
)}

</div>

</div>


{/* RIGHT SIDE */}

<div className="profile-right">

{/* MEDICAL HISTORY */}

<div className="card">

<h3>Medical History</h3>

{bookings.length===0 && (
<p>No history yet</p>
)}

{bookings.map((booking)=>{

let date="";

if(booking.date && booking.date.toDate){
date = booking.date.toDate().toLocaleDateString();
}

return(

<div className="timeline-item" key={booking.id}>

<div>

<strong>{booking.test_name}</strong>
<p>{booking.lab_name}</p>

</div>

<div>

<p>{date}</p>
<p>{booking.time}</p>

</div>

</div>

);

})}

</div>



{/* RECENT REQUESTS */}

<div className="card">

<h3>Recent Requests</h3>

{allRequests.length===0 && (
<p>No requests yet</p>
)}

{allRequests.map(req=>{

if(req.type==="blood"){

return(

<div className="request" key={req.id}>

<div>

<p>Blood Request – {req.blood_type}</p>
<small>{req.hospital_name}</small>

</div>

<div>

<span className={`status ${getStatusClass(req.status)}`}>
{req.status}
</span>

</div>

</div>

);

}

return(

<div className="request" key={req.id}>

<div>

<p>Lab Booking – {req.test_name}</p>
<small>{req.lab_name}</small>

</div>

<div>

<span className={`status ${getStatusClass(req.status)}`}>
{req.status}
</span>

{req.status==="pending" && (

<button
className="cancel-btn"
onClick={()=>cancelBooking(req.id)}
>

Cancel

</button>

)}

</div>

</div>

);

})}

</div>

</div>

</div>

</div>

<Footer/>

</>

);

}

export default Profile;
