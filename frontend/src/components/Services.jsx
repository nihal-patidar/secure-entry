import React from 'react';
import { QrCode, Shield, Users, BarChart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <QrCode className="h-8 w-8" />,
      title: "QR Code Generation",
      description: "Generate secure QR codes for easy ticket validation"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Fraud Prevention",
      description: "Advanced security features to prevent ticket duplication"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-User Access",
      description: "Manage team permissions and roles effectively"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Analytics",
      description: "Track ticket usage and attendance in real-time"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">Comprehensive ticket management solutions for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card group">
              <div className="icon-wrapper">{service.icon}</div>
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}