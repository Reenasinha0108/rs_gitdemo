import React from 'react';
import { Shipment } from '@types/index';
import './TrackingModal.css';

interface TrackingModalProps {
  shipment: Shipment;
  onClose: () => void;
}

const TrackingModal: React.FC<TrackingModalProps> = ({ shipment, onClose }) => {
  const statusSteps = ['Processing', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered'];
  const currentStatusIndex = statusSteps.indexOf(shipment.status);

  return (
    <div className="tracking-overlay" onClick={onClose}>
      <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tracking-header">
          <h2>Shipment Tracking</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tracking-body">
          <div className="shipment-info">
            <div className="info-item">
              <span className="info-label">Shipment ID:</span>
              <span className="info-value">{shipment.shipmentId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Customer:</span>
              <span className="info-value">{shipment.customer}</span>
            </div>
            <div className="info-item">
              <span className="info-label">From:</span>
              <span className="info-value">{shipment.origin}</span>
            </div>
            <div className="info-item">
              <span className="info-label">To:</span>
              <span className="info-value">{shipment.destination}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mode:</span>
              <span className="info-value">{shipment.shippingMode}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Current Status:</span>
              <span className={`status-badge status-${shipment.status.toLowerCase().replace(/ /g, '-')}`}>
                {shipment.status}
              </span>
            </div>
          </div>

          <div className="tracking-timeline">
            <h3>Tracking Timeline</h3>
            <div className="timeline">
              {statusSteps.map((step, index) => (
                <div
                  key={step}
                  className={`timeline-item ${
                    index <= currentStatusIndex ? 'completed' : 'pending'
                  }`}
                >
                  <div className="timeline-dot">
                    {index <= currentStatusIndex ? '✓' : ''}
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-step">{step}</p>
                    {index === currentStatusIndex && (
                      <p className="timeline-current">Current Step</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tracking-dates">
            <div className="date-item">
              <span className="date-label">Shipment Date:</span>
              <span className="date-value">{shipment.shipmentDate}</span>
            </div>
            <div className="date-item">
              <span className="date-label">Expected Delivery:</span>
              <span className="date-value">{shipment.arrivalDate}</span>
            </div>
            <div className="date-item">
              <span className="date-label">Assigned To:</span>
              <span className="date-value">{shipment.assignee}</span>
            </div>
          </div>
        </div>

        <div className="tracking-footer">
          <button onClick={onClose} className="btn-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingModal;
