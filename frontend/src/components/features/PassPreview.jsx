import React from 'react';
import { QrCode } from 'lucide-react';

export default function PassPreview() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="relative bg-white/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="pass-preview">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">VIP Access Pass</h3>
              <p className="text-gray-600">Tech Conference 2024</p>
            </div>
            <QrCodeSVG />
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold">March 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Venue</span>
              <span className="font-semibold">Tech Convention Center</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seat</span>
              <span className="font-semibold">A1-23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QrCodeSVG() {
  return (
    <div className="qr-code-container">
      <svg width="80" height="80" viewBox="0 0 80 80" className="qr-pattern">
        <defs>
          <linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="60" height="60" fill="url(#qr-gradient)" opacity="0.1" />
        <path d="M20 20h20v20h-20z" fill="url(#qr-gradient)" />
        <path d="M50 50h10v10h-10z" fill="url(#qr-gradient)" />
        <path d="M20 50h20v10h-20z" fill="url(#qr-gradient)" />
        <path d="M50 20h10v20h-10z" fill="url(#qr-gradient)" />
      </svg>
      <QrCode className="absolute inset-0 m-auto text-indigo-600" size={32} />
    </div>
  );
}