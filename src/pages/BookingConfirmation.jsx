import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./BookingConfirmation.css";

function BookingConfirmation() {

const location = useLocation();
const navigate = useNavigate();

const booking = location.state;

if(!booking){
return <p>No booking data found.</p>
}

return(

<>
<Navbar/>

<div className="confirmation-container">

<h2>✅ Booking Confirmed</h2>

<div className="confirmation-card">

<p><strong>Name:</strong> {booking.name}</p>
<p><strong>Phone:</strong> {booking.phone}</p>
<p><strong>Lab:</strong> {booking.lab}</p>
<p><strong>Test:</strong> {booking.test}</p>
<p><strong>Date:</strong> {booking.date}</p>
<p><strong>Time:</strong> {booking.time}</p>
<p><strong>Home Collection:</strong> {booking.home}</p>

</div>

<button
className="back-btn"
onClick={()=>navigate("/profile")}
>
Go to My Bookings
</button>

</div>

<Footer/>
</>

)

}

export default BookingConfirmation;