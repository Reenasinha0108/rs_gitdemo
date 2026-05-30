import { Shipment, CreateShipmentRequest, ShipmentsListResponse } from '@types/index';
import { localStorage } from '@utils/localStorage';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ShipmentService {
  private getHeaders(): Record<string, string> {
    const token = localStorage.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  async getAllShipments(page: number = 1, pageSize: number = 10): Promise<ShipmentsListResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/shipments?page=${page}&pageSize=${pageSize}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch shipments');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch shipments');
    }
  }

  async getShipmentById(id: string): Promise<Shipment> {
    try {
      const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shipment');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch shipment details');
    }
  }

  async searchShipments(query: string): Promise<Shipment[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/shipments/search?q=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: this.getHeaders()
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      throw new Error('Search failed');
    }
  }

  async createShipment(shipmentData: CreateShipmentRequest): Promise<Shipment> {
    try {
      const response = await fetch(`${API_BASE_URL}/shipments`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(shipmentData)
      });

      if (!response.ok) {
        throw new Error('Failed to create shipment');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to create shipment');
    }
  }

  async updateShipment(id: string, updates: Partial<Shipment>): Promise<Shipment> {
    try {
      const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Failed to update shipment');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to update shipment');
    }
  }

  async deleteShipment(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Failed to delete shipment');
      }
    } catch (error) {
      throw new Error('Failed to delete shipment');
    }
  }
}

export default new ShipmentService();
