import React from 'react';
import { Ticket, ScanLine, ArrowRight } from 'lucide-react';
import { useNavigate,Link } from 'react-router-dom';
export default function Hero() {
  const navigate = useNavigate();
  return (
    <div id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Secure Ticket Generation & Validation
            </h1>
            <p className="text-xl text-gray-600">
              Create, manage, and validate tickets with our powerful platform. Perfect for events, venues, and organizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="register">
              <button className="btn-primary">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="ticket-card">
                  <Ticket className="h-8 w-8 text-indigo-600" />
                  <h3 className="text-lg font-semibold mt-2">Generate Tickets</h3>
                  <p className="text-sm text-gray-600">Create secure, unique tickets instantly</p>
                </div>
                <div className="ticket-card">
                  <ScanLine className="h-8 w-8 text-purple-600" />
                  <h3 className="text-lg font-semibold mt-2">Scan & Validate</h3>
                  <p className="text-sm text-gray-600">Quick and reliable validation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}