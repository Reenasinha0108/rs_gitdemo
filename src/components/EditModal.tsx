import React, { useState } from 'react';
import { Shipment, ShipmentStatus } from '@types/index';
import './EditModal.css';

interface EditModalProps {
  shipment: Shipment;
  onClose: () => void;
  onSave: (updates: Partial<Shipment>) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ shipment, onClose, onSave }) => {
  const [status, setStatus] = useState<ShipmentStatus>(shipment.status);
  const [arrivalDate, setArrivalDate] = useState<string>(shipment.arrivalDate);
  const [assignee, setAssignee] = useState<string>(shipment.assignee);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const statusOptions: ShipmentStatus[] = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'In Transit'];

  const handleSave = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');
      await onSave({
        status,
        arrivalDate,
        assignee
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving changes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (): void => {
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{shipment.shipmentId}</h2>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customer">Customer</label>
              <input
                id="customer"
                type="text"
                value={shipment.customer}
                disabled
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="origin">Origin</label>
              <input
                id="origin"
                type="text"
                value={shipment.origin}
                disabled
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                type="text"
                value={shipment.destination}
                disabled
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
                className="form-input"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                value={`${shipment.price}00`}
                disabled
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="shipmentDate">Shipment Date</label>
              <input
                id="shipmentDate"
                type="text"
                value={shipment.shipmentDate}
                disabled
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="arrivalDate">Arrival Date *</label>
              <input
                id="arrivalDate"
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignee">Assignee *</label>
              <input
                id="assignee"
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="form-input"
                placeholder="Enter assignee name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paymentMode">Payment Mode</label>
              <input
                id="paymentMode"
                type="text"
                value={shipment.payment}
                disabled
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="shippingMode">Shipping Mode</label>
              <input
                id="shippingMode"
                type="text"
                value={shipment.shippingMode}
                disabled
                className="form-input"
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleCancel} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSave} disabled={isLoading} className="btn-save">
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
