import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PassCreator from '../components/features/PassCreator';
import InvitationCreator from '../components/features/InvitationCreator';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(()=>{
    let token = localStorage.getItem('userData');
    if(token){
      navigate('/home');
    }
  },[])
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <PassCreator />
      <InvitationCreator />
      <Contact />
      <Footer />
    </div>
  );
}