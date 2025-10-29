import React, { useState, useMemo } from 'react';
import type { Order, OrderItem, Client } from '../types';
import { OrderStatus } from '../types';

interface NewOrderModalProps {
  clients: Client[];
  onClose: () => void;
  onSave: (newOrder: Omit<Order, 'id'|'total'|'date'>) => void;
}

const emptyItem: Omit<OrderItem, 'id'> = { code: '', concept: '', quantity: 1, price: 0, discount: 0 };

export const NewOrderModal: React.FC<NewOrderModalProps> = ({ clients, onClose, onSave }) => {
  const [clientId, setClientId] = useState<number | undefined>(clients[0]?.id);
  const [items, setItems] = useState<Omit<OrderItem, 'id'>[]>([{...emptyItem}]);

  const handleItemChange = (index: number, field: keyof Omit<OrderItem, 'id'>, value: string | number) => {
    const newItems = [...items];
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    newItems[index] = { ...newItems[index], [field]: field === 'quantity' || field === 'price' || field === 'discount' ? (isNaN(numValue) ? 0 : numValue) : value };
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([...items, {...emptyItem}]);
  };

  const removeItemRow = (index: number) => {
    if (items.length > 1) {
        setItems(items.filter((_, i) => i !== index));
    }
  };

  const { baseTotal, ivaTotal, totalFinal } = useMemo(() => {
    const base = items.reduce((acc, item) => {
      const itemTotal = item.quantity * item.price * (1 - item.discount / 100);
      return acc + itemTotal;
    }, 0);
    const iva = base * 0.21;
    const final = base + iva;
    return { baseTotal: base, ivaTotal: iva, totalFinal: final };
  }, [items]);

  const handleSaveClick = () => {
    if (!clientId) {
      alert("Por favor, seleccione un cliente.");
      return;
    }
    const newOrder = {
      clientId: clientId,
      status: OrderStatus.PENDING_FACTUSOL, // Default status for new manual orders
      items: items.map((item, index) => ({...item, id: index + 1})),
    };
    onSave(newOrder);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-gray-800 w-full max-w-4xl p-6 rounded-lg shadow-xl relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-3xl font-bold">&times;</button>
          
          <h3 className="text-2xl font-bold text-gray-100 mb-4 border-b border-gray-700 pb-2">Crear Nuevo Pedido</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div>
              <label htmlFor="client-select" className="block text-sm font-medium text-gray-400">Cliente</label>
              <select
                id="client-select"
                value={clientId}
                onChange={e => setClientId(parseInt(e.target.value))}
                className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 p-2 border rounded-md"
              >
                <option disabled value="">Seleccione un cliente</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Vendedor</label>
              <input type="text" value="Vendedor Único" className="mt-1 block w-full bg-gray-900 border-gray-700 text-gray-400 p-2 border rounded-md" disabled />
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase">Código</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase">Concepto</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase">Cant.</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase">P. Unit. (€)</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase">Desc. (%)</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase">Subtotal (€)</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-400 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {items.map((item, index) => {
                  const subtotal = item.quantity * item.price * (1 - item.discount / 100);
                  return (
                    <tr key={index}>
                      <td className="p-1"><input type="text" value={item.code} onChange={e => handleItemChange(index, 'code', e.target.value)} className="w-full bg-gray-700 p-1 rounded" /></td>
                      <td className="p-1"><input type="text" value={item.concept} onChange={e => handleItemChange(index, 'concept', e.target.value)} className="w-full bg-gray-700 p-1 rounded" /></td>
                      <td className="p-1"><input type="number" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} min="1" className="w-16 bg-gray-700 p-1 rounded text-center" /></td>
                      <td className="p-1"><input type="number" value={item.price} onChange={e => handleItemChange(index, 'price', e.target.value)} min="0" step="0.01" className="w-24 bg-gray-700 p-1 rounded text-right" /></td>
                      <td className="p-1"><input type="number" value={item.discount} onChange={e => handleItemChange(index, 'discount', e.target.value)} min="0" max="100" className="w-16 bg-gray-700 p-1 rounded text-center" /></td>
                      <td className="p-1 whitespace-nowrap text-sm font-medium text-gray-200 text-right">{subtotal.toFixed(2)} €</td>
                      <td className="p-1 text-center"><button onClick={() => removeItemRow(index)} className="text-red-400 hover:text-red-600" disabled={items.length <= 1}>&times;</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button onClick={addItemRow} className="text-sm text-gray-300 hover:text-white">+ Añadir línea</button>

          <div className="flex justify-end mt-4">
            <div className="w-full max-w-xs space-y-2">
              <div className="flex justify-between text-sm text-gray-400"><span>Base Imponible:</span><span>{baseTotal.toFixed(2)} €</span></div>
              <div className="flex justify-between text-sm text-gray-400"><span>IVA (21%):</span><span>{ivaTotal.toFixed(2)} €</span></div>
              <div className="flex justify-between text-xl font-bold text-gray-100 border-t border-gray-600 pt-2"><span>TOTAL ALBARÁN:</span><span>{totalFinal.toFixed(2)} €</span></div>
            </div>
          </div>

          <div className="flex justify-end pt-6 space-x-3">
            <button onClick={handleSaveClick} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition-colors">Guardar Pedido</button>
          </div>
        </div>
      </div>
    </div>
  );
};