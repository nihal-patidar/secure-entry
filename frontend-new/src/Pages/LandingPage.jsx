import React, { useEffect } from "react";
import Navbar from "../components/LandingPageComps/Navbar.jsx";
import Hero from "../components/layout/Hero";
// import PassCreator from "../components/features/Features";
import InvitationCreator from "../components/LandingPageComps/InvitationCreator";
import Contact from "../components/LandingPageComps/Contact";
import Footer from "../components/LandingPageComps/Footer";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/LandingPageComps/HowItWorks";
import Features from "../components/LandingPageComps/Features";
import Testimonial from "../components/LandingPageComps/Testimonial";
import AboutUs from "../components/LandingPageComps/AboutUs";

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("userData");
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <InvitationCreator />
      <Testimonial />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}
