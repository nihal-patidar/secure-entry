import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PassCreator from "../components/features/Features";
import InvitationCreator from "../components/features/InvitationCreator";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/features/Features";
import Testimonial from "../components/features/Testimonial";
import AboutUs from "../components/features/AboutUs";

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
