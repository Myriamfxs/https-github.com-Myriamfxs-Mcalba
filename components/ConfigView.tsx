import React, { useState } from 'react';
import type { AppConfig } from '../types';
import { INITIAL_CONFIG, LOG_DATA } from '../constants';

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

const LogLine: React.FC<{ line: string }> = ({ line }) => {
  let colorClass = 'text-gray-400';
  let badge = null;
  let cleanLine = line;

  if (line.includes('[INFO]')) {
    colorClass = 'text-gray-300';
    badge = <span className="text-blue-400 mr-2">INFO</span>;
  } else if (line.includes('[ERROR]')) {
    colorClass = 'text-red-400 font-semibold';
    badge = <span className="text-red-400 mr-2">ERROR</span>;
  } else if (line.includes('[API CALL]')) {
    colorClass = 'text-purple-400';
    badge = <span className="text-purple-400 mr-2">API</span>;
  } else if (line.includes('[API RESP]')) {
    colorClass = 'text-green-400';
    badge = <span className="text-green-400 mr-2">RESP</span>;
  }
  
  cleanLine = line.replace(/\[\d{2}:\d{2}:\d{2}\] /, '').replace(/\[(INFO|ERROR|API CALL|API RESP)\] /, '');

  return (
    <div className={`flex font-mono text-sm py-1 ${colorClass}`}>
      <span className="w-24 text-gray-500">{line.match(/\d{2}:\d{2}:\d{2}/)?.[0]}</span>
      <span className="w-20 flex-shrink-0">{badge}</span>
      <span className="break-all">{cleanLine}</span>
    </div>
  );
};

const LogModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const logEntries = LOG_DATA.split('---').filter(entry => entry.trim());

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-gray-800 w-full max-w-5xl p-6 rounded-lg shadow-xl relative max-h-[90vh] flex flex-col">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-3xl font-bold">&times;</button>
                    <h3 className="text-2xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Registro de Actividad del Sistema</h3>
                    <div className="flex-grow overflow-y-auto space-y-4">
                        {logEntries.map((entry, index) => {
                            const lines = entry.trim().split('\n');
                            const title = lines.shift() || 'Registro';
                            return (
                                <div key={index}>
                                    <h4 className="text-lg text-gray-400 mb-2 sticky top-0 bg-gray-800 py-1">{title.trim()}</h4>
                                    <div>
                                        {lines.map((line, lineIndex) => line.trim() ? <LogLine key={lineIndex} line={line} /> : null)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ConfigView: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

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

  const handleExportLogs = () => {
    const blob = new Blob([LOG_DATA.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    link.download = `marcelinocalvo-logs-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
      
      <ConfigCard title="Registro de Actividad del Sistema">
        <p className="text-sm text-gray-400 mb-4">
            Consulta el registro detallado de todas las operaciones, llamadas a API y posibles errores del sistema.
        </p>
        <div className="flex items-center space-x-4">
            <button
                onClick={() => setIsLogModalOpen(true)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-md flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
                Ver Registro Completo
            </button>
            <button
                onClick={handleExportLogs}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-md flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar a .txt
            </button>
        </div>
      </ConfigCard>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-semibold py-2 px-4 rounded-md transition-colors">
          Guardar Configuración
        </button>
      </div>

      {isLogModalOpen && <LogModal onClose={() => setIsLogModalOpen(false)} />}
    </div>
  );
};