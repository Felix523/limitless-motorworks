import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import Confirmation from "./pages/Confirmation";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import AutoParts from "./pages/AutoParts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointments" element={<Appointments clientName="Limitless MotorWorks" />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/autoparts" element={<AutoParts />} />
    </Routes>
  );
}

export default App;
