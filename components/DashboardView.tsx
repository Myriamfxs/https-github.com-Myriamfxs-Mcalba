import React, { useState, useCallback } from 'react';
import type { Order, Client } from '../types';
import { OrderStatus } from '../types';
import { INITIAL_ORDERS } from '../constants';
import { ReviewModal } from './ReviewModal';
import { StatusBadge } from './StatusBadge';

interface DashboardViewProps {
  clients: Client[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ clients }) => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<{order: Order, client: Client} | null>(null);

  const handleOpenReviewModal = (orderId: string) => {
    const orderToReview = orders.find(o => o.id === orderId);
    const clientForOrder = clients.find(c => c.id === orderToReview?.clientId);
    if (orderToReview && clientForOrder) {
      setSelectedOrder({order: orderToReview, client: clientForOrder});
    }
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleSaveReviewedOrder = useCallback((updatedOrder: Order) => {
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === updatedOrder.id
          ? { ...updatedOrder, status: OrderStatus.PENDING_FACTUSOL }
          : o
      )
    );
    handleCloseModal();
    alert(`Pedido ${updatedOrder.id} revisado y guardado. Listo para exportar a Factusol.`);
  }, []);

  const handleExportToFactusol = (orderId: string) => {
    alert(`Enviando el Albarán ${orderId} con el Cliente y las líneas de detalle revisadas a la API de Factusol...`);
    setOrders(prevOrders =>
      prevOrders.map(o =>
        o.id === orderId ? { ...o, status: OrderStatus.COMPLETED } : o
      )
    );
    alert(`✅ Albarán ${orderId} creado con éxito en Factusol y marcado como COMPLETO.`);
  };

  const handleViewPdf = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    const client = clients.find(c => c.id === order?.clientId);
    if (!order || !client) return;

    const invoiceHtml = `
      <html>
        <head>
          <title>Albarán ${order.id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 p-10 font-sans">
          <div class="max-w-4xl mx-auto bg-white p-8 rounded shadow">
            <div class="flex justify-between items-center border-b pb-4 mb-8">
              <div>
                <h1 class="text-2xl font-bold">ALBARÁN</h1>
                <p class="text-gray-500">Número: ${order.id}</p>
                <p class="text-gray-500">Fecha: ${new Date(order.date).toLocaleDateString('es-ES')}</p>
              </div>
              <div class="text-right">
                <h2 class="text-xl font-bold">Marcelino Calvo S.L.</h2>
                <p class="text-gray-600">CIF: B12345679</p>
                <p class="text-gray-600">Pol. Ind. El Montalvo, Salamanca</p>
              </div>
            </div>
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-2">Cliente:</h3>
              <p class="font-bold">${client.name}</p>
              <p>${client.address}</p>
              <p>CIF: ${client.cif}</p>
              <p>Email: ${client.email}</p>
            </div>
            <table class="w-full mb-8">
              <thead>
                <tr class="bg-gray-200">
                  <th class="p-2 text-left">Código</th>
                  <th class="p-2 text-left">Concepto</th>
                  <th class="p-2 text-right">Cantidad</th>
                  <th class="p-2 text-right">Precio Unit.</th>
                  <th class="p-2 text-right">Dto.</th>
                  <th class="p-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr class="border-b">
                    <td class="p-2">${item.code}</td>
                    <td class="p-2">${item.concept}</td>
                    <td class="p-2 text-right">${item.quantity}</td>
                    <td class="p-2 text-right">${item.price.toFixed(2)} €</td>
                    <td class="p-2 text-right">${item.discount.toFixed(2)}%</td>
                    <td class="p-2 text-right font-semibold">${(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)} €</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="flex justify-end">
              <div class="w-64">
                <div class="flex justify-between text-gray-700"><p>Base Imponible:</p><p>${(order.total / 1.21).toFixed(2)} €</p></div>
                <div class="flex justify-between text-gray-700"><p>IVA (21%):</p><p>${(order.total - order.total / 1.21).toFixed(2)} €</p></div>
                <div class="flex justify-between font-bold text-xl mt-2 border-t pt-2"><p>TOTAL:</p><p>${order.total.toFixed(2)} €</p></div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    const pdfWindow = window.open("", "_blank");
    pdfWindow?.document.write(invoiceHtml);
    pdfWindow?.document.close();
  };


  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-100 mb-4">Pedidos Procesados (Telegram/Voz)</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total (EUR)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map(order => {
                const clientName = clients.find(c => c.id === order.clientId)?.name || 'Cliente no encontrado';
                return (
                  <tr key={order.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-200">{order.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{clientName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">{order.total.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{order.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {order.status === OrderStatus.MANUAL_REVIEW && (
                        <button onClick={() => handleOpenReviewModal(order.id)} className="px-2 py-1 text-xs font-medium rounded-md bg-gray-600 text-gray-100 hover:bg-gray-500">Revisar</button>
                      )}
                      {order.status === OrderStatus.PENDING_FACTUSOL && (
                         <button onClick={() => handleExportToFactusol(order.id)} className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-600 text-white hover:bg-emerald-700">Exportar a Factusol</button>
                      )}
                      {order.status === OrderStatus.COMPLETED && (
                        <button onClick={() => handleViewPdf(order.id)} className="px-2 py-1 text-xs font-medium rounded-md text-gray-400 border border-gray-600 hover:bg-gray-700">Ver PDF</button>
                      )}
                      {order.status === OrderStatus.FACTUSOL_ERROR && (
                        <button className="px-2 py-1 text-xs font-medium rounded-md text-gray-400 border border-gray-600 hover:bg-gray-700">Ver Log</button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <ReviewModal
          order={selectedOrder.order}
          client={selectedOrder.client}
          onClose={handleCloseModal}
          onSave={handleSaveReviewedOrder}
        />
      )}
    </div>
  );
};
