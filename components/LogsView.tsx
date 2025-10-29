import React from 'react';
import { LOG_DATA } from '../constants';

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


export const LogsView: React.FC = () => {
    const logEntries = LOG_DATA.split('---').filter(entry => entry.trim());

    return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Registro de Actividad del Sistema</h2>
       {logEntries.map((entry, index) => {
           const lines = entry.trim().split('\n');
           const title = lines.shift() || 'Registro';
           return (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-xl">
                 <h3 className="text-xl text-gray-400 mb-4 border-b border-gray-700 pb-2">{title.trim()}</h3>
                 <div className="max-h-[60vh] overflow-y-auto">
                    {lines.map((line, lineIndex) => line.trim() ? <LogLine key={lineIndex} line={line} /> : null)}
                 </div>
            </div>
           )
       })}
    </div>
  );
};
