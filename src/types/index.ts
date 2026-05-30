// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Shipment Types
export interface Shipment {
  id: string;
  shipmentId: string;
  origin: string;
  destination: string;
  shippingMode: 'Air' | 'Water' | 'Road';
  price: number;
  payment: string;
  status: ShipmentStatus;
  customer: string;
  assignee: string;
  shipmentDate: string;
  arrivalDate: string;
  pricePaid: number;
}

export type ShipmentStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'In Transit';

export interface ShipmentFormData {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  shipmentMode: 'Air' | 'Water' | 'Road';
  price: number;
  weight: number;
  description: string;
  arrivalDate: string;
  assignee: string;
  status: ShipmentStatus;
}

export interface CreateShipmentRequest {
  senderDetails: SenderDetails;
  recipientDetails: RecipientDetails;
  shipmentDetails: ShipmentDetailsInfo;
}

export interface SenderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface RecipientDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface ShipmentDetailsInfo {
  shippingMode: 'Air' | 'Water' | 'Road';
  price: number;
  weight: number;
  description: string;
  estimatedDelivery: string;
}

// UI State Types
export interface EditModalState {
  isOpen: boolean;
  shipment: Shipment | null;
}

export interface TrackingModalState {
  isOpen: boolean;
  shipment: Shipment | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
