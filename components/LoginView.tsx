import React, { useState } from 'react';
import { Logo } from './Logo';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password-seguro-inicial-123');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === 'admin' && password === 'password-seguro-inicial-123') {
      onLogin();
    } else {
      alert('Credenciales incorrectas. (Simulación: usa admin / password-seguro-inicial-123)');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <Logo aria-label="Marcelino Calvo Logo" className="w-48 h-auto mx-auto mb-4" />
        <h2 className="text-xl text-center mb-6 text-gray-400">Acceso al Panel de Gestión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gray-600 text-gray-100 hover:bg-gray-500 transition-colors w-full py-2 rounded-md font-semibold"
          >
            Entrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          <a
            href="#"
            onClick={() => alert('Email de reseteo enviado a su correo.')}
            className="text-gray-400 hover:text-gray-200"
          >
            ¿Recordar Contraseña?
          </a>
        </p>
      </div>
    </div>
  );
};
