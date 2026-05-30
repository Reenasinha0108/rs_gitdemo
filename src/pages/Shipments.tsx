import React, { useState, useEffect } from 'react';
import Sidebar from '@components/Sidebar';
import { shipmentService } from '@services/index';
import { Shipment } from '@types/index';
import './Shipments.css';
import EditModal from '@components/EditModal';
import TrackingModal from '@components/TrackingModal';

const Shipments: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState<boolean>(false);

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await shipmentService.getAllShipments(1, 50);
      setShipments(response.data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load shipments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string): Promise<void> => {
    setSearchQuery(query);
    if (query.trim() === '') {
      loadShipments();
      return;
    }

    try {
      const results = await shipmentService.searchShipments(query);
      setShipments(results);
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleSelectShipment = (shipment: Shipment): void => {
    setSelectedShipment(selectedShipment?.id === shipment.id ? null : shipment);
  };

  const handleEditClick = (): void => {
    if (selectedShipment) {
      setEditModalOpen(true);
    }
  };

  const handleTrackClick = (): void => {
    if (selectedShipment) {
      setTrackingModalOpen(true);
    }
  };

  const handleSaveEdit = async (updatedShipment: Partial<Shipment>): Promise<void> => {
    if (!selectedShipment) return;

    try {
      await shipmentService.updateShipment(selectedShipment.id, updatedShipment);
      setEditModalOpen(false);
      loadShipments();
    } catch (err) {
      setError('Failed to update shipment');
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'in transit':
        return 'status-in-transit';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'out for delivery':
        return 'status-out-for-delivery';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="shipments-layout">
      <Sidebar activeLink="shipments" />
      <div className="shipments-container">
        <div className="shipments-header">
          <h1>Shipments</h1>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <div className="search-section">
          <input
            type="text"
            placeholder="Search Shipments"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
          {selectedShipment && (
            <div className="action-buttons">
              <button onClick={handleEditClick} className="icon-btn edit-btn" title="Edit">
                ✏️
              </button>
              <button onClick={handleTrackClick} className="icon-btn track-btn" title="Track">
                👁️
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="loading">Loading shipments...</div>
        ) : (
          <div className="table-wrapper">
            <table className="shipments-table">
              <thead>
                <tr>
                  <th width="5%">Select</th>
                  <th>Shipment ID</th>
                  <th>Shipping</th>
                  <th>Price Bid</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Customer</th>
                  <th>Assignee</th>
                  <th>Shipment Date</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className={selectedShipment?.id === shipment.id ? 'selected' : ''}
                  >
                    <td>
                      <input
                        type="radio"
                        name="shipment-select"
                        checked={selectedShipment?.id === shipment.id}
                        onChange={() => handleSelectShipment(shipment)}
                      />
                    </td>
                    <td className="shipment-id">{shipment.shipmentId}</td>
                    <td>{shipment.shippingMode}</td>
                    <td>${shipment.price}</td>
                    <td>{shipment.payment}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td>{shipment.customer}</td>
                    <td>{shipment.assignee}</td>
                    <td>{shipment.shipmentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {shipments.length === 0 && !isLoading && (
          <div className="no-results">No shipments found</div>
        )}
      </div>

      {editModalOpen && selectedShipment && (
        <EditModal
          shipment={selectedShipment}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}

      {trackingModalOpen && selectedShipment && (
        <TrackingModal
          shipment={selectedShipment}
          onClose={() => setTrackingModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Shipments;
