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
import LabBooking from "./pages/LabBooking";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages */}
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

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicine-search"
          element={
            <ProtectedRoute>
              <MedicineSearch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pharmacies"
          element={
            <ProtectedRoute>
              <Pharmacies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/blood-requests"
          element={
            <ProtectedRoute>
              <BloodRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab-tests"
          element={
            <ProtectedRoute>
              <LabTests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lab-booking"
          element={
            <ProtectedRoute>
              <LabBooking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}