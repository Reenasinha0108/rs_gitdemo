import { Shipment, User, LoginCredentials, AuthResponse } from './index';

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: Record<string, string>;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ShipmentsListResponse {
  data: Shipment[];
  total: number;
  page: number;
  pageSize: number;
}
