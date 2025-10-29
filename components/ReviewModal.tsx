import React, { useState, useEffect, useMemo } from 'react';
import type { Order, OrderItem, Client } from '../types';

interface ReviewModalProps {
  order: Order;
  client: Client;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ order, client, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState<Order>(() => JSON.parse(JSON.stringify(order)));
  const [editedClientName, setEditedClientName] = useState(client.name);

  useEffect(() => {
    setEditedOrder(JSON.parse(JSON.stringify(order)));
    setEditedClientName(client.name);
  }, [order, client]);
  
  const handleItemChange = (itemId: number, field: keyof OrderItem, value: number) => {
    setEditedOrder(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, [field]: isNaN(value) ? 0 : value } : item
      ),
    }));
  };

  const { baseTotal, ivaTotal, totalFinal } = useMemo(() => {
    const base = editedOrder.items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.price * (1 - item.discount / 100);
      return acc + itemTotal;
    }, 0);
    const iva = base * 0.21;
    const final = base + iva;
    return { baseTotal: base, ivaTotal: iva, totalFinal: final };
  }, [editedOrder.items]);

  const handleSaveClick = () => {
    // Here you might also want to save the client name change
    // For now, we only update the order total and its items.
    onSave({...editedOrder, total: totalFinal});
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-gray-800 w-full max-w-4xl p-6 rounded-lg shadow-xl relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-3xl font-bold">&times;</button>
          
          <h3 className="text-2xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Revisión de Pedido: <span>{order.id}</span></h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Cliente (DNI/CIF)</label>
              <input type="text" value={editedClientName} onChange={e => setEditedClientName(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Vendedor</label>
              <input type="text" value="Vendedor Único" className="mt-1 block w-full bg-gray-900 border-gray-700 text-gray-400 p-2 border rounded-md" disabled />
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Código</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Concepto</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cant.</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P. Unit. (€)</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Desc. (%)</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Subtotal (€)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {editedOrder.items.map(item => {
                  const subtotal = item.quantity * item.price * (1 - item.discount / 100);
                  return (
                    <tr key={item.id}>
                      <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-200">{item.code}</td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-400">{item.concept}</td>
                      <td className="px-2 py-3"><input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))} min="1" className="w-16 bg-gray-700 p-1 rounded text-center" /></td>
                      <td className="px-2 py-3"><input type="number" value={item.price.toFixed(2)} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value))} min="0.01" step="0.01" className="w-24 bg-gray-700 p-1 rounded text-right" /></td>
                      <td className="px-2 py-3"><input type="number" value={item.discount} onChange={e => handleItemChange(item.id, 'discount', parseFloat(e.target.value))} min="0" max="100" className="w-16 bg-gray-700 p-1 rounded text-center" /></td>
                      <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-200">{subtotal.toFixed(2)} €</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm text-gray-400"><span>Base Imponible:</span><span>{baseTotal.toFixed(2)} €</span></div>
              <div className="flex justify-between text-sm text-gray-400"><span>IVA (21%):</span><span>{ivaTotal.toFixed(2)} €</span></div>
              <div className="flex justify-between text-xl font-bold text-gray-100 border-t border-gray-600 pt-2"><span>TOTAL ALBARÁN:</span><span>{totalFinal.toFixed(2)} €</span></div>
            </div>
          </div>

          <div className="flex justify-end pt-6 space-x-3">
            <button onClick={handleSaveClick} className="bg-gray-600 hover:bg-gray-500 text-gray-100 font-semibold py-2 px-4 rounded-md transition-colors">Guardar Revisión y Marcar como Listo</button>
          </div>
        </div>
      </div>
    </div>
  );
};
