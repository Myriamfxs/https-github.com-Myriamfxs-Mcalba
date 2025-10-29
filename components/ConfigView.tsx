import React, { useState } from 'react';
import type { AppConfig } from '../types';
import { INITIAL_CONFIG } from '../constants';

const ConfigCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
    <h3 className="text-xl text-gray-400 mb-4 border-b border-gray-700 pb-2">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField: React.FC<{ label: string; id: string; type: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, id, type, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-400">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
    />
  </div>
);

export const ConfigView: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const path = name.split('.');
    
    setConfig(prevConfig => {
        const newConfig = JSON.parse(JSON.stringify(prevConfig));
        let current = newConfig;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = type === 'number' ? parseFloat(value) : value;
        return newConfig;
    });
  };

  const handleSave = () => {
    alert('Configuración guardada en la base de datos del Microservicio.');
    console.log('Saving config:', config);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Configuración de APIs y Lógica de Negocio</h2>

      <ConfigCard title="Factusol API">
        <InputField label="URL del Endpoint de Factusol" id="factusolUrl" type="url" value={config.factusolUrl} onChange={handleChange} />
        <InputField label="Client ID" id="factusolClientId" type="text" value={config.factusolClientId} onChange={handleChange} />
        <InputField label="Client Secret" id="factusolClientSecret" type="password" value={config.factusolClientSecret} onChange={handleChange} />
      </ConfigCard>

      <ConfigCard title="Servicios Auxiliares">
        <InputField label="Endpoint Voz a Texto (STT)" id="sttEndpoint" type="url" value={config.sttEndpoint} onChange={handleChange} />
        <InputField label="Usuario SMTP (Email para Albaranes)" id="smtpUser" type="email" value={config.smtpUser} onChange={handleChange} />
      </ConfigCard>

      <ConfigCard title="Descuentos Configurables (Telegram)">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Opción 1 (%)" id="discounts.option1" type="number" value={config.discounts.option1} onChange={handleChange} />
          <InputField label="Opción 2 (%)" id="discounts.option2" type="number" value={config.discounts.option2} onChange={handleChange} />
          <InputField label="Opción 3 (%)" id="discounts.option3" type="number" value={config.discounts.option3} onChange={handleChange} />
        </div>
      </ConfigCard>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-semibold py-2 px-4 rounded-md transition-colors">
          Guardar Configuración
        </button>
      </div>
    </div>
  );
};
