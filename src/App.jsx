import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import MedicineSearch from "./pages/MedicineSearch";
import Pharmacies from "./pages/Pharmacies";
import BloodRequests from "./pages/BloodRequests";
import LabTests from "./pages/LabTests";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import LabBooking from "./pages/LabBooking";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BookingConfirmation from "./pages/BookingConfirmation";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientCard from "./pages/PatientCard";
import BloodEmergency from "./pages/BloodEmergency";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/patient/:uid" element={<PatientCard/>}/>
      <Route path="/" element={<Login />} />


        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blood-emergency" element={<BloodEmergency/>}/>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/medicine-search" element={<MedicineSearch />} />
        <Route path="/pharmacies" element={<Pharmacies />} />
        <Route path="/blood-requests" element={<BloodRequests />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/lab-booking" element={<LabBooking />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
<Route
path="/booking-confirmation"
element={<BookingConfirmation/>}
/>
      </Routes>
    </BrowserRouter>
  );
}