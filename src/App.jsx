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

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

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
      </Routes>
    </BrowserRouter>
  );
}