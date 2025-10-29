import React, { useState, useCallback } from 'react';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { ConfigView } from './components/ConfigView';
import { ClientsView } from './components/ClientsView';
import { LogsView } from './components/LogsView';
import { INITIAL_CLIENTS } from './constants';
import type { Client } from './types';
import { Logo } from './components/Logo';


type View = 'dashboard' | 'clients' | 'logs' | 'config';

const Header: React.FC<{ currentView: View; setView: (view: View) => void; onLogout: () => void; }> = ({ currentView, setView, onLogout }) => {
  const navButtonClasses = (view: View) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      currentView === view ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;
  
  const iconButtonClasses = "text-gray-400 hover:text-white transition-colors";

  return (
    <header className="bg-gray-800 shadow-lg border-b-2 border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Logo aria-label="Marcelino Calvo Logo" className="h-12 w-auto" />
          <div className="flex items-baseline space-x-2">
             <h1 className="text-xl sm:text-2xl font-bold text-gray-100">Gestión de Pedidos</h1>
             <span className="bg-blue-800 text-blue-300 text-xs font-semibold px-2 py-0.5 rounded-full">Beta</span>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <button onClick={() => setView('dashboard')} className={navButtonClasses('dashboard')}>
            Pedidos
          </button>
          <button onClick={() => setView('clients')} className={navButtonClasses('clients')}>
            Clientes
          </button>
          <button onClick={() => setView('logs')} className={navButtonClasses('logs')}>
            Registros
          </button>
          <button onClick={() => setView('config')} className={iconButtonClasses} title="Configuración">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
           <button onClick={onLogout} className={iconButtonClasses} title="Salir">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center text-xs text-gray-400">
      &copy; 2025 Marcelino Calvo. Microservicio desarrollado en Python (Flask).
    </div>
  </footer>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  
  const handleClientUpdate = (updatedClients: Client[]) => {
    setClients(updatedClients);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {currentView === 'dashboard' && <DashboardView clients={clients} />}
          {currentView === 'clients' && <ClientsView clients={clients} onClientsChange={handleClientUpdate} />}
          {currentView === 'logs' && <LogsView />}
          {currentView === 'config' && <ConfigView />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;