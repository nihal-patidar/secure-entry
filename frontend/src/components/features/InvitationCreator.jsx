import React from 'react';
import { Mail, Palette, Image, Share2 } from 'lucide-react';

export default function InvitationCreator() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Secure-Entry</h2>
          <p className="mt-4 text-xl text-gray-600">Create stunning digital invitations with embedded QR codes</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="feature-card">
            <div className="icon-wrapper">
              <Palette className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Beautiful Templates</h3>
            <p className="mt-2 text-gray-600">Choose from our collection of professionally designed templates</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <Image className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Customization</h3>
            <p className="mt-2 text-gray-600">Add your own images, colors, and branding elements</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mt-4">Easy Sharing</h3>
            <p className="mt-2 text-gray-600">Share via email or generate shareable links</p>
          </div>
        </div>
      </div>
    </section>
  );
}