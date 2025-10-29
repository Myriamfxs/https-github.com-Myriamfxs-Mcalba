import React from 'react';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return 'bg-green-800 text-green-300';
      case OrderStatus.MANUAL_REVIEW:
        return 'bg-yellow-800 text-yellow-300';
      case OrderStatus.FACTUSOL_ERROR:
        return 'bg-red-800 text-red-300';
      case OrderStatus.PENDING_FACTUSOL:
        return 'bg-blue-800 text-blue-300';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  );
};
