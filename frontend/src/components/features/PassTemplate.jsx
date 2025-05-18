import React from 'react';

export function PassTemplate() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-indigo-600">
      <defs>
        <linearGradient id="template-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <rect x="5" y="10" width="30" height="20" rx="2" fill="url(#template-gradient)" opacity="0.2" />
      <rect x="8" y="13" width="24" height="4" rx="1" fill="url(#template-gradient)" />
      <rect x="8" y="19" width="12" height="2" rx="1" fill="url(#template-gradient)" opacity="0.7" />
      <rect x="8" y="23" width="16" height="2" rx="1" fill="url(#template-gradient)" opacity="0.7" />
    </svg>
  );
}