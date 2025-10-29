import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="250" height="60" viewBox="0 0 250 60" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      .title { font-family: system-ui, sans-serif; font-size: 20px; font-weight: 600; fill: #D1D5DB; letter-spacing: 0.5px; }
      .subtitle { font-family: system-ui, sans-serif; font-size: 9px; fill: #6B7280; letter-spacing: 1.5px; text-transform: uppercase; }
    `}</style>
    <text x="50%" y="25" dominantBaseline="middle" textAnchor="middle" className="title">MARCELINO CALVO</text>
    <text x="50%" y="45" dominantBaseline="middle" textAnchor="middle" className="subtitle">Cuchillería Profesional</text>
  </svg>
);
