import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LabBooking.css";

function LabBooking(){

const location = useLocation();
const params = new URLSearchParams(location.search);
const test = params.get("test");
const [success,setSuccess] = useState(false);
const handleSubmit = (e) => {

    e.preventDefault();
    
    setSuccess(true);
    
    }
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

<form className="booking-card" onSubmit={handleSubmit}>

<label>Patient Name *</label>
<input type="text" placeholder="Enter patient name" required />

<label>Phone Number *</label>
<input
type="tel"
placeholder="+20 XXX XXX XXXX"
pattern="[0-9]{11}"
required
/>

<label>City *</label>
<input type="text" placeholder="Enter city" required />

<label>Select Lab *</label>
<select required>
<option value="">Select Lab</option>
<option>Al Mokhtabar</option>
<option>Alfa Labs</option>
<option>Royal Lab</option>
</select>

<label>Preferred Date *</label>
<input type="date" required />

<label>Home Collection</label>
<select>
<option>Yes</option>
<option>No</option>
</select>

<button type="submit" className="confirm-btn">
Confirm Booking
</button>
{success && (

<p className="success-message">
✅ Booking Confirmed Successfully!
</p>

)}

</form>

</div>

</div>

<Footer/>
</>

)

}

export default LabBooking