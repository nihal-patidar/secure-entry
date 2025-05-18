import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="h-6 w-6 text-indigo-600" />
                <span>asksolutionheap@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-6 w-6 text-indigo-600" />
                <span>+91 6261677451</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-6 w-6 text-indigo-600" />
                <span>Jabalpur Engineering College, Hostel No. 8</span>
              </div>
            </div>
          </div>

          {/* <form className="space-y-6 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" className="form-input" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" className="form-input" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" rows={4} className="form-input"></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form> */}
        </div>
      </div>
    </section>
  );
}