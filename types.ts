export enum OrderStatus {
  COMPLETED = 'COMPLETADO',
  MANUAL_REVIEW = 'REVISIÓN MANUAL',
  FACTUSOL_ERROR = 'ERROR (Factusol)',
  PENDING_FACTUSOL = 'PENDIENTE FACTUSOL'
}

export interface OrderItem {
  id: number;
  code: string;
  concept: string;
  quantity: number;
  price: number;
  discount: number;
}

export interface Client {
  id: number;
  name: string;
  cif: string;
  phone: string;
  email: string;
  address: string;
}

export interface Order {
  id: string;
  clientId: number;
  total: number;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
}

export interface AppConfig {
  factusolUrl: string;
  factusolClientId: string;
  factusolClientSecret: string;
  sttEndpoint: string;
  smtpUser: string;
  discounts: {
    option1: number;
    option2: number;
    option3: number;
  };
}