import React from 'react';
import { Ticket, QrCode, Share2 } from 'lucide-react';
import PassPreview from './PassPreview';
import { PassTemplate } from './PassTemplate';

export default function PassCreator() {
  return (
    <section id="creator" className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">Create Custom Passes</h2>
          <p className="mt-4 text-xl text-gray-600">Design beautiful passes with our intuitive creator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <PassTemplate />
                  <div>
                    <h3 className="text-lg font-semibold">Choose Template</h3>
                    <p className="text-sm text-gray-600">Select from our premium designs</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="template-btn">
                    <Ticket className="h-5 w-5" />
                    Event Pass
                  </button>
                  <button className="template-btn">
                    <QrCode className="h-5 w-5" />
                    E-Invitation
                  </button>
                </div>
              </div>
            </div>
          </div>

          <PassPreview />
        </div>
      </div>
    </section>
  );
}