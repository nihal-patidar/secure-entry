import React from 'react';
import { Ticket, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full px-4 pt-5">
      <div className="">
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <Ticket className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">SecureEntry</span>
            </div>
            <p className="text-gray-400">
              Secure Entry for Retricted Entries.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link> </li>
              <li><Link to="https://ticket-scanner-next-hcb2.vercel.app/" className="text-gray-400 hover:text-white">Scanner Application</Link> </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 flex flex-col gap-2">
              <li><Link to="https://merchant.razorpay.com/policy/OOYfcYXpSIIozc/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link> </li>
              <li><Link to="https://merchant.razorpay.com/policy/OOYfcYXpSIIozc/terms" className="text-gray-400 hover:text-white">Terms of Service</Link> </li>
              <li><Link to="https://merchant.razorpay.com/policy/OOYfcYXpSIIozc/refund" className="text-gray-400 hover:text-white">Cancellation and Refund Policy
              </Link> </li>
              <li><Link to="https://merchant.razorpay.com/policy/OOYfcYXpSIIozc/shipping">Shipping & Delivery Policy
              </Link> </li>
              <li><Link to="https://merchant.razorpay.com/policy/OOYfcYXpSIIozc/contact_us">Contact us
              </Link> </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="https://www.linkedin.com/in/nihal-patidar/" className="text-gray-400 hover:text-white">
                {/* <Linkedin className="h-6 w-6" /> */}
                <span>Nihal Patidar</span>
              </Link> 
              <Link to="https://www.instagram.com/yagyadeep_ahirwar786?igsh=dXg1YTVid2ZvN2Ex" className="text-gray-400 hover:text-white">
                {/* <Linkedin className="h-6 w-6" /> */}
                <span>Yagyadeep Ahirwar</span>
              </Link> 

            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} E-Validation . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}