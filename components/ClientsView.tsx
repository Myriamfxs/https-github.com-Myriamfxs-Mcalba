import React, { useState, useMemo } from 'react';
import type { Client, Order } from '../types';
import { INITIAL_ORDERS } from '../constants';

const NewClientModal: React.FC<{ onClose: () => void; onSave: (client: Omit<Client, 'id'>) => void; }> = ({ onClose, onSave }) => {
  const [newClient, setNewClient] = useState({ name: '', cif: '', email: '', phone: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newClient);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen p-4">
        <form onSubmit={handleSubmit} className="bg-gray-800 w-full max-w-lg p-6 rounded-lg shadow-xl relative">
          <button type="button" onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-3xl font-bold">&times;</button>
          <h3 className="text-2xl font-bold text-gray-100 mb-4">Añadir Nuevo Cliente</h3>
          <div className="space-y-4">
            <input name="name" value={newClient.name} onChange={handleChange} placeholder="Nombre Completo o Razón Social" className="w-full bg-gray-700 p-2 rounded" required />
            <input name="cif" value={newClient.cif} onChange={handleChange} placeholder="CIF/NIF" className="w-full bg-gray-700 p-2 rounded" required />
            <input name="email" value={newClient.email} onChange={handleChange} placeholder="Email" type="email" className="w-full bg-gray-700 p-2 rounded" required />
            <input name="phone" value={newClient.phone} onChange={handleChange} placeholder="Teléfono" className="w-full bg-gray-700 p-2 rounded" />
            <input name="address" value={newClient.address} onChange={handleChange} placeholder="Dirección" className="w-full bg-gray-700 p-2 rounded" />
          </div>
          <div className="flex justify-end pt-6">
            <button type="submit" className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-semibold py-2 px-4 rounded-md">Guardar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ClientOrdersModal: React.FC<{ client: Client, onClose: () => void }> = ({ client, onClose }) => {
    const clientOrders = INITIAL_ORDERS.filter(order => order.clientId === client.id);

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-gray-800 w-full max-w-2xl p-6 rounded-lg shadow-xl relative">
                    <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-3xl font-bold">&times;</button>
                    <h3 className="text-2xl font-bold text-gray-100 mb-4">Historial de Pedidos de <span className="text-gray-300">{client.name}</span></h3>
                    {clientOrders.length > 0 ? (
                        <ul className="space-y-2 max-h-96 overflow-y-auto">
                            {clientOrders.map(order => (
                                <li key={order.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-200">Pedido: {order.id}</p>
                                        <p className="text-sm text-gray-400">Fecha: {order.date}</p>
                                    </div>
                                    <p className="font-mono text-lg text-gray-200">{order.total.toFixed(2)} €</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-center py-8">Este cliente no tiene pedidos registrados.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


export const ClientsView: React.FC<{ clients: Client[]; onClientsChange: (clients: Client[]) => void; }> = ({ clients, onClientsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = useMemo(() =>
    clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cif.toLowerCase().includes(searchTerm.toLowerCase())
    ), [clients, searchTerm]);

  const handleSaveClient = (newClientData: Omit<Client, 'id'>) => {
    const newClient: Client = {
      id: Math.max(0, ...clients.map(c => c.id)) + 1,
      ...newClientData,
    };
    onClientsChange([...clients, newClient]);
    setIsNewClientModalOpen(false);
    alert(`Cliente "${newClient.name}" añadido con éxito.`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Gestión de Clientes</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre o CIF..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-gray-100 p-2 border rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none w-full max-w-xs"
          />
          <button onClick={() => setIsNewClientModalOpen(true)} className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-semibold py-2 px-4 rounded-md">
            + Nuevo Cliente
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">CIF</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-700 cursor-pointer" onClick={() => setSelectedClient(client)}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-200">{client.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{client.cif}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{client.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isNewClientModalOpen && (
        <NewClientModal
          onClose={() => setIsNewClientModalOpen(false)}
          onSave={handleSaveClient}
        />
      )}
      {selectedClient && (
        <ClientOrdersModal 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </div>
  );
};
