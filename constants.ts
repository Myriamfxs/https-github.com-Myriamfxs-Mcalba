import type { Order, AppConfig, Client } from './types';
import { OrderStatus } from './types';

export const INITIAL_CLIENTS: Client[] = [
  { id: 1, name: 'Ferretería Central S.L.', cif: 'B12345678', phone: '912 345 678', email: 'compras@ferreteriacentral.es', address: 'Calle Principal 1, 28001 Madrid' },
  { id: 2, name: 'Cuchillería del Norte', cif: 'A87654321', phone: '944 123 456', email: 'pedidos@cuchillerianorte.com', address: 'Avenida Bilbao 20, 48002 Bilbao' },
  { id: 3, name: 'Suministros Industriales Sur S.A.', cif: 'A29876543', phone: '954 987 654', email: 'logistica@suministrossur.es', address: 'Polígono Industrial La Red, 41500 Alcalá de Guadaíra, Sevilla' },
  { id: 4, name: 'Hostelería La Cocina Moderna', cif: 'B98712345', phone: '932 109 876', email: 'proveedores@cocinamoderna.com', address: 'Carrer de Balmes 100, 08008 Barcelona' },
  { id: 5, name: 'Carnicerías El Buen Corte', cif: 'G45678912', phone: '963 555 444', email: 'elbuencorte@email.com', address: 'Plaza del Mercado 5, 46001 Valencia' },
  { id: 6, name: 'Carser, SL', cif: 'B37123456', phone: '923 12 34 56', email: 'info@carser.es', address: 'Polígono El Montalvo II, 37008 Salamanca' },
  { id: 7, name: 'Carnicería El Buen Gusto', cif: 'B49876543', phone: '980 55 51 23', email: 'pedidos@elbuengusto.com', address: 'Mercado de Abastos Puesto 5, 49001 Zamora' },
  { id: 8, name: 'Martín Garcia Miranda', cif: '12345678A', phone: '611 22 33 44', email: 'martin.garcia@email.com', address: 'Calle Toro 80, 37002 Salamanca' },
  { id: 9, name: 'Manuel Moya Garcia', cif: '87654321B', phone: '622 33 44 55', email: 'm.moya.garcia@email.es', address: 'Avenida Portugal 150, 37006 Salamanca' },
  { id: 10, name: 'Rosa Maria Torres Martinez', cif: '45678912C', phone: '633 44 55 66', email: 'rosam.torres@email.net', address: 'Plaza Mayor 10, 37001 Salamanca' },
  { id: 11, name: 'Jose Ruiz Torres', cif: '98712345D', phone: '644 55 66 77', email: 'jose.ruiz.t@email.com', address: 'Paseo de la Estación 5, 37004 Salamanca' },
];


export const INITIAL_ORDERS: Order[] = [
  {
    id: '#00121',
    clientId: 7,
    total: 855.00,
    date: '2025-10-23',
    status: OrderStatus.COMPLETED,
    items: [
      { id: 1, code: 'SRA-050', concept: 'Sierra de carnicero 50cm', quantity: 10, price: 95.00, discount: 10 },
    ],
  },
  {
    id: '#00120',
    clientId: 6,
    total: 750.00,
    date: '2025-10-23',
    status: OrderStatus.COMPLETED,
    items: [
      { id: 1, code: 'IND-B01', concept: 'Cuchillas Industriales Pack 10', quantity: 5, price: 150.00, discount: 0 },
    ],
  },
  {
    id: '#00122',
    clientId: 8,
    total: 75.00,
    date: '2025-10-22',
    status: OrderStatus.COMPLETED,
    items: [
      { id: 1, code: 'cuch-007', concept: 'Cuchillo deshuesar flexible 15cm', quantity: 3, price: 25.00, discount: 0 },
    ],
  },
   {
    id: '#00116',
    clientId: 9,
    total: 382.50,
    date: '2025-10-22',
    status: OrderStatus.COMPLETED,
    items: [
      { id: 1, code: 'NVJ-200', concept: 'Navaja Plegable Acero 200mm', quantity: 30, price: 15.00, discount: 15 },
    ],
  },
  {
    id: '#00117',
    clientId: 7,
    total: 80.00,
    date: '2025-10-22',
    status: OrderStatus.PENDING_FACTUSOL,
    items: [
      { id: 1, code: 'afil-003', concept: 'Afilador de diamante', quantity: 1, price: 80.00, discount: 0 },
    ],
  },
  {
    id: '#00113',
    clientId: 6,
    total: 427.50,
    date: '2025-10-21',
    status: OrderStatus.COMPLETED,
    items: [
      { id: 1, code: 'PACK-H01', concept: 'Pack Hostelería Básico', quantity: 1, price: 450.00, discount: 5 },
    ],
  },
  {
    id: '#00114',
    clientId: 8,
    total: 115.00,
    date: '2025-10-21',
    status: OrderStatus.MANUAL_REVIEW,
    items: [
      { id: 1, code: 'TIJ-C01', concept: 'Tijeras de cocina profesionales', quantity: 5, price: 23.00, discount: 0 },
    ],
  },
  {
    id: '#00115',
    clientId: 9,
    total: 51.00,
    date: '2025-10-21',
    status: OrderStatus.PENDING_FACTUSOL,
    items: [
      { id: 1, code: 'UTL-G50', concept: 'Guantes Anticorte (Pack 50)', quantity: 2, price: 25.50, discount: 0 },
    ],
  },
  {
    id: '#00105',
    clientId: 3,
    total: 1800.00,
    date: '2025-03-06',
    status: OrderStatus.COMPLETED,
    items: [
        { id: 1, code: 'SRA-IND', concept: 'Sierra industrial de cinta', quantity: 1, price: 1800, discount: 0 },
    ],
  },
  {
    id: '#00104',
    clientId: 1,
    total: 1250.00,
    date: '2025-02-19',
    status: OrderStatus.PENDING_FACTUSOL,
    items: [
      { id: 1, code: 'DISC-250', concept: 'Disco de sierra 250mm', quantity: 20, price: 62.50, discount: 0 },
    ],
  },
  {
    id: '#00103',
    clientId: 4,
    total: 230.00,
    date: '2025-02-03',
    status: OrderStatus.FACTUSOL_ERROR,
    items: [
       { id: 1, code: 'TIJ-C01', concept: 'Tijeras de cocina profesionales', quantity: 10, price: 23.00, discount: 0 },
    ],
  },
  {
    id: '#00102',
    clientId: 2,
    total: 895.75,
    date: '2025-01-15',
    status: OrderStatus.MANUAL_REVIEW,
    items: [
      { id: 1, code: 'NVJ-200', concept: 'Navaja Plegable Acero 200mm', quantity: 10, price: 15.00, discount: 10 },
      { id: 2, code: 'SRA-120', concept: 'Sierra de corte manual 120cm', quantity: 3, price: 150.25, discount: 15 },
      { id: 3, code: 'UTL-G50', concept: 'Guantes Anticorte (Pack 50)', quantity: 2, price: 25.50, discount: 5 },
    ],
  },
  {
    id: '#00101',
    clientId: 5,
    total: 350.50,
    date: '2025-01-07',
    status: OrderStatus.COMPLETED,
    items: [
      { id: 1, code: ' cuch-001', concept: 'Cuchillo de chef 20cm', quantity: 5, price: 45.50, discount: 10 },
      { id: 2, code: 'afil-003', concept: 'Afilador de diamante', quantity: 2, price: 80.00, discount: 15 },
    ],
  },
];

export const INITIAL_CONFIG: AppConfig = {
  factusolUrl: 'https://api.factusol.es/v1/albaran',
  factusolClientId: 'tu_client_id_factusol',
  factusolClientSecret: '********',
  sttEndpoint: 'https://api.stt.proveedor.com/v2/convert',
  smtpUser: 'albaranes@marcelinocalvo.com',
  discounts: {
    option1: 5,
    option2: 10,
    option3: 15,
  },
};

export const LOG_DATA = `
### ACTIVIDAD: 23/10/2025

[09:15:01] [INFO] PEDIDO #00120: Inicializado. Origen: Webhook Telegram.
[09:15:03] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0127
[09:15:03] [API RESP] <-- 200 OK | Cliente 0301 (Carser, SL) encontrado.
[09:15:05] [INFO] DB: Borrador de Pedido #00120 creado. Estado: PENDIENTE FACTUSOL.
[10:30:15] [INFO] PEDIDO #00121: Inicializado. Origen: Voz (STT).
[10:30:16] [API CALL] --> POST https://api.stt.proveedor.com/v2/convert
[10:30:18] [API RESP] <-- 200 OK | Transcripción OK. Texto: "10 sierras SRA-050. Cliente 0230, descuento 10%".
[10:30:19] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0230
[10:30:19] [API RESP] <-- 200 OK | Cliente 0230 (Carnicería El Buen Gusto) encontrado.
[10:30:20] [API CALL] --> GET https://api.factusol.es/articulos/precios?codigo=SRA-050
[10:30:20] [API RESP] <-- 200 OK | Precio SRA-050: 95.00 EUR.
[10:30:21] [INFO] DB: Borrador de Pedido #00121 creado. Estado: PENDIENTE FACTUSOL.
[10:35:05] [INFO] DASHBOARD: Solicitud de Exportación de Pedido #00121.
[10:35:07] [API CALL] --> POST https://api.factusol.es/albaranes/crear
[10:35:08] [API RESP] <-- 201 CREATED | Albarán Factusol ID: A2025/00135.
[10:35:08] [INFO] DB: Pedido #00121 Actualizado. Estado: COMPLETADO.
[10:35:09] [INFO] EMAIL: Albarán A2025/00135 enviado.
[12:00:10] [INFO] PEDIDO #00122: Inicializado. Origen: Webhook Telegram.
[12:00:11] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0089
[12:00:11] [API RESP] <-- 200 OK | Cliente 0089 (Martín Garcia Miranda) encontrado.
[12:00:13] [ERROR] API Factusol: La búsqueda del artículo "Cuchillo de deshuesar" falló por código ambiguo.
[12:00:13] [INFO] DB: Borrador de Pedido #00122 creado. Estado: REVISIÓN MANUAL (Error de artículo).
[13:00:05] [INFO] DASHBOARD: Solicitud de Exportación de Pedido #00120.
[13:00:06] [API CALL] --> POST https://api.factusol.es/albaranes/crear
[13:00:07] [API RESP] <-- 201 CREATED | Albarán Factusol ID: A2025/00136.
[13:00:07] [INFO] DB: Pedido #00120 Actualizado. Estado: COMPLETADO.
[13:00:08] [INFO] EMAIL: Albarán A2025/00136 enviado.

---

### ACTIVIDAD: 22/10/2025

[09:05:01] [INFO] PEDIDO #00116: Inicializado. Origen: Voz (STT).
[09:05:03] [API CALL] --> POST https://api.stt.proveedor.com/v2/convert
[09:05:05] [API RESP] <-- 200 OK | Transcripción OK. Texto: "30 Navajas Plegables código NVJ-200. Cliente 0193."
[09:05:06] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0193
[09:05:06] [API RESP] <-- 200 OK | Cliente 0193 (Manuel Moya Garcia) encontrado.
[09:05:07] [INFO] DB: Borrador de Pedido #00116 creado. Estado: REVISIÓN MANUAL (Descuento no especificado).
[10:15:15] [INFO] DASHBOARD: Usuario Admin Guardó la Revisión Manual de Pedido #00122.
[10:15:15] [INFO] DB: Pedido #00122 Actualizado. Artículo corregido. Estado: PENDIENTE FACTUSOL.
[10:15:20] [INFO] DASHBOARD: Solicitud de Exportación de Pedido #00122.
[10:15:21] [API CALL] --> POST https://api.factusol.es/albaranes/crear
[10:15:22] [API RESP] <-- 201 CREATED | Albarán Factusol ID: A2025/00133.
[10:15:22] [INFO] DB: Pedido #00122 Actualizado. Estado: COMPLETADO.
[10:15:23] [INFO] EMAIL: Albarán A2025/00133 enviado.
[11:40:00] [INFO] PEDIDO #00117: Inicializado. Origen: Webhook Telegram.
[11:40:01] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0230
[11:40:01] [API RESP] <-- 200 OK | Cliente 0230 (Carnicería El Buen Gusto) encontrado.
[11:40:03] [INFO] DB: Borrador de Pedido #00117 creado. Estado: PENDIENTE FACTUSOL.
[14:30:10] [INFO] DASHBOARD: Usuario Admin Guardó la Revisión Manual de Pedido #00116.
[14:30:11] [INFO] DB: Pedido #00116 Actualizado. Descuento aplicado: 15% (Opción 3). Estado: PENDIENTE FACTUSOL.
[14:30:15] [INFO] DASHBOARD: Solicitud de Exportación de Pedido #00116.
[14:30:16] [API CALL] --> POST https://api.factusol.es/albaranes/crear
[14:30:17] [API RESP] <-- 201 CREATED | Albarán Factusol ID: A2025/00134.
[14:30:17] [INFO] DB: Pedido #00116 Actualizado. Estado: COMPLETADO.
[14:30:18] [INFO] EMAIL: Albarán A2025/00134 enviado.

---

### ACTIVIDAD: 21/10/2025

[10:00:00] [INFO] PEDIDO #00113: Inicializado. Origen: Voz (STT).
[10:00:02] [API CALL] --> POST https://api.stt.proveedor.com/v2/convert
[10:00:04] [API RESP] <-- 200 OK | Transcripción OK. Texto: "Pack cuchillería para hostelería. Cliente 0127. Aplicar 5%."
[10:00:05] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0127
[10:00:05] [API RESP] <-- 200 OK | Cliente 0127 (Alberto Martinez Lazaro) encontrado.
[10:00:07] [INFO] DB: Borrador de Pedido #00113 creado. Estado: PENDIENTE FACTUSOL.
[11:05:00] [INFO] DASHBOARD: Solicitud de Exportación de Pedido #00113.
[11:05:01] [API CALL] --> POST https://api.factusol.es/albaranes/crear
[11:05:02] [API RESP] <-- 201 CREATED | Albarán Factusol ID: A2025/00130.
[11:05:02] [INFO] DB: Pedido #00113 Actualizado. Estado: COMPLETADO.
[11:05:03] [INFO] EMAIL: Albarán A2025/00130 enviado.
[14:30:15] [INFO] PEDIDO #00114: Inicializado. Origen: Webhook Telegram.
[14:30:16] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0089
[14:30:16] [API RESP] <-- 200 OK | Cliente 0089 (Martín Garcia Miranda) encontrado.
[14:30:18] [ERROR] API Factusol: Cliente 0089 no tiene condiciones de pago configuradas.
[14:30:18] [INFO] DB: Borrador de Pedido #00114 creado. Estado: REVISIÓN MANUAL (Error de Cliente).
[16:45:00] [INFO] PEDIDO #00115: Inicializado. Origen: Voz (STT).
[16:45:01] [API CALL] --> GET https://api.factusol.es/clientes/buscar?id=0193
[16:45:01] [API RESP] <-- 200 OK | Cliente 0193 (Manuel Moya Garcia) encontrado.
[16:45:03] [INFO] DB: Borrador de Pedido #00115 creado. Estado: PENDIENTE FACTUSOL.
`;
