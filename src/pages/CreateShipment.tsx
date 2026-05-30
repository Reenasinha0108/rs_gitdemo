import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@components/Sidebar';
import { shipmentService } from '@services/index';
import { CreateShipmentRequest, SenderDetails, RecipientDetails, ShipmentDetailsInfo } from '@types/index';
import { validators } from '@utils/validators';
import './CreateShipment.css';

type CreateStep = 'sender' | 'recipient' | 'shipment' | 'confirmation';

const CreateShipment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CreateStep>('sender');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const [senderDetails, setSenderDetails] = useState<SenderDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const [recipientDetails, setRecipientDetails] = useState<RecipientDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetailsInfo>({
    shippingMode: 'Air',
    price: 0,
    weight: 0,
    description: '',
    estimatedDelivery: ''
  });

  const validateSenderDetails = (): boolean => {
    if (!senderDetails.name || !senderDetails.email || !senderDetails.phone || !senderDetails.address) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!validators.isValidEmail(senderDetails.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!validators.isValidPhone(senderDetails.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const validateRecipientDetails = (): boolean => {
    if (!recipientDetails.name || !recipientDetails.email || !recipientDetails.phone || !recipientDetails.address) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!validators.isValidEmail(recipientDetails.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!validators.isValidPhone(recipientDetails.phone)) {
      setError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const validateShipmentDetails = (): boolean => {
    if (!shipmentDetails.description || !shipmentDetails.estimatedDelivery) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!validators.isValidPrice(shipmentDetails.price)) {
      setError('Please enter a valid price');
      return false;
    }
    if (!validators.isValidWeight(shipmentDetails.weight)) {
      setError('Please enter a valid weight');
      return false;
    }
    return true;
  };

  const handleNextSender = (): void => {
    setError('');
    if (validateSenderDetails()) {
      setCurrentStep('recipient');
    }
  };

  const handleNextRecipient = (): void => {
    setError('');
    if (validateRecipientDetails()) {
      setCurrentStep('shipment');
    }
  };

  const handleNextShipment = (): void => {
    setError('');
    if (validateShipmentDetails()) {
      setCurrentStep('confirmation');
    }
  };

  const handleCreateShipment = async (): Promise<void> => {
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      setIsLoading(true);
      const request: CreateShipmentRequest = {
        senderDetails,
        recipientDetails,
        shipmentDetails
      };
      await shipmentService.createShipment(request);
      navigate('/shipments');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create shipment');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = (): void => {
    if (currentStep === 'recipient') setCurrentStep('sender');
    else if (currentStep === 'shipment') setCurrentStep('recipient');
    else if (currentStep === 'confirmation') setCurrentStep('shipment');
  };

  const getProgressPercentage = (): number => {
    switch (currentStep) {
      case 'sender':
        return 25;
      case 'recipient':
        return 50;
      case 'shipment':
        return 75;
      case 'confirmation':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="create-shipment-layout">
      <Sidebar activeLink="create" />
      <div className="create-shipment-container">
        <div className="create-header">
          <h1>Create Shipment</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
        </div>

        {error && <div className="error-alert">{error}</div>}

        {currentStep === 'sender' && (
          <div className="form-section">
            <div className="section-title">
              <span className="step-number">1</span>
              <h2>Sender Details</h2>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="senderName">Full Name *</label>
                <input
                  id="senderName"
                  type="text"
                  value={senderDetails.name}
                  onChange={(e) => setSenderDetails({ ...senderDetails, name: e.target.value })}
                  className="form-input"
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderEmail">Email *</label>
                <input
                  id="senderEmail"
                  type="email"
                  value={senderDetails.email}
                  onChange={(e) => setSenderDetails({ ...senderDetails, email: e.target.value })}
                  className="form-input"
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderPhone">Phone *</label>
                <input
                  id="senderPhone"
                  type="tel"
                  value={senderDetails.phone}
                  onChange={(e) => setSenderDetails({ ...senderDetails, phone: e.target.value })}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderZipCode">Zip Code</label>
                <input
                  id="senderZipCode"
                  type="text"
                  value={senderDetails.zipCode}
                  onChange={(e) => setSenderDetails({ ...senderDetails, zipCode: e.target.value })}
                  className="form-input"
                  placeholder="Enter zip code"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="senderAddress">Address *</label>
                <textarea
                  id="senderAddress"
                  value={senderDetails.address}
                  onChange={(e) => setSenderDetails({ ...senderDetails, address: e.target.value })}
                  className="form-textarea"
                  placeholder="Enter full address"
                  rows={3}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="senderCity">City</label>
                <input
                  id="senderCity"
                  type="text"
                  value={senderDetails.city}
                  onChange={(e) => setSenderDetails({ ...senderDetails, city: e.target.value })}
                  className="form-input"
                  placeholder="Enter city"
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderCountry">Country</label>
                <input
                  id="senderCountry"
                  type="text"
                  value={senderDetails.country}
                  onChange={(e) => setSenderDetails({ ...senderDetails, country: e.target.value })}
                  className="form-input"
                  placeholder="Enter country"
                />
              </div>
            </div>
            <div className="button-group">
              <button onClick={handleNextSender} className="btn-next">
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 'recipient' && (
          <div className="form-section">
            <div className="section-title">
              <span className="step-number">2</span>
              <h2>Recipient Details</h2>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="recipientName">Full Name *</label>
                <input
                  id="recipientName"
                  type="text"
                  value={recipientDetails.name}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, name: e.target.value })}
                  className="form-input"
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipientEmail">Email *</label>
                <input
                  id="recipientEmail"
                  type="email"
                  value={recipientDetails.email}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, email: e.target.value })}
                  className="form-input"
                  placeholder="Enter email address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipientPhone">Phone *</label>
                <input
                  id="recipientPhone"
                  type="tel"
                  value={recipientDetails.phone}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, phone: e.target.value })}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipientZipCode">Zip Code</label>
                <input
                  id="recipientZipCode"
                  type="text"
                  value={recipientDetails.zipCode}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, zipCode: e.target.value })}
                  className="form-input"
                  placeholder="Enter zip code"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="recipientAddress">Address *</label>
                <textarea
                  id="recipientAddress"
                  value={recipientDetails.address}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, address: e.target.value })}
                  className="form-textarea"
                  placeholder="Enter full address"
                  rows={3}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="recipientCity">City</label>
                <input
                  id="recipientCity"
                  type="text"
                  value={recipientDetails.city}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, city: e.target.value })}
                  className="form-input"
                  placeholder="Enter city"
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipientCountry">Country</label>
                <input
                  id="recipientCountry"
                  type="text"
                  value={recipientDetails.country}
                  onChange={(e) => setRecipientDetails({ ...recipientDetails, country: e.target.value })}
                  className="form-input"
                  placeholder="Enter country"
                />
              </div>
            </div>
            <div className="button-group">
              <button onClick={handlePrevious} className="btn-previous">
                Previous
              </button>
              <button onClick={handleNextRecipient} className="btn-next">
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 'shipment' && (
          <div className="form-section">
            <div className="section-title">
              <span className="step-number">3</span>
              <h2>Shipment Details</h2>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="shippingMode">Shipping Mode *</label>
                <select
                  id="shippingMode"
                  value={shipmentDetails.shippingMode}
                  onChange={(e) => setShipmentDetails({ ...shipmentDetails, shippingMode: e.target.value as 'Air' | 'Water' | 'Road' })}
                  className="form-input"
                >
                  <option value="Air">Air</option>
                  <option value="Water">Water</option>
                  <option value="Road">Road</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (USD) *</label>
                <input
                  id="price"
                  type="number"
                  value={shipmentDetails.price}
                  onChange={(e) => setShipmentDetails({ ...shipmentDetails, price: parseFloat(e.target.value) })}
                  className="form-input"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg) *</label>
                <input
                  id="weight"
                  type="number"
                  value={shipmentDetails.weight}
                  onChange={(e) => setShipmentDetails({ ...shipmentDetails, weight: parseFloat(e.target.value) })}
                  className="form-input"
                  placeholder="Enter weight"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label htmlFor="estimatedDelivery">Estimated Delivery *</label>
                <input
                  id="estimatedDelivery"
                  type="date"
                  value={shipmentDetails.estimatedDelivery}
                  onChange={(e) => setShipmentDetails({ ...shipmentDetails, estimatedDelivery: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  value={shipmentDetails.description}
                  onChange={(e) => setShipmentDetails({ ...shipmentDetails, description: e.target.value })}
                  className="form-textarea"
                  placeholder="Enter shipment description"
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div className="button-group">
              <button onClick={handlePrevious} className="btn-previous">
                Previous
              </button>
              <button onClick={handleNextShipment} className="btn-next">
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="form-section">
            <div className="section-title">
              <span className="step-number">4</span>
              <h2>Confirmation</h2>
            </div>
            <div className="confirmation-content">
              <h3>Review Shipment Details</h3>
              <div className="confirmation-grid">
                <div className="confirmation-item">
                  <h4>Sender</h4>
                  <p><strong>{senderDetails.name}</strong></p>
                  <p>{senderDetails.email}</p>
                  <p>{senderDetails.phone}</p>
                  <p>{senderDetails.address}</p>
                </div>
                <div className="confirmation-item">
                  <h4>Recipient</h4>
                  <p><strong>{recipientDetails.name}</strong></p>
                  <p>{recipientDetails.email}</p>
                  <p>{recipientDetails.phone}</p>
                  <p>{recipientDetails.address}</p>
                </div>
                <div className="confirmation-item">
                  <h4>Shipment</h4>
                  <p>Mode: <strong>{shipmentDetails.shippingMode}</strong></p>
                  <p>Price: <strong>${shipmentDetails.price}</strong></p>
                  <p>Weight: <strong>{shipmentDetails.weight} kg</strong></p>
                  <p>Delivery: <strong>{shipmentDetails.estimatedDelivery}</strong></p>
                </div>
              </div>

              <div className="terms-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <span>I agree to the terms and conditions of GloLogistics's Shipment Agreement</span>
                </label>
              </div>
            </div>
            <div className="button-group">
              <button onClick={handlePrevious} className="btn-previous">
                Previous
              </button>
              <button 
                onClick={handleCreateShipment} 
                disabled={isLoading || !agreedToTerms}
                className="btn-create"
              >
                {isLoading ? 'Creating...' : 'Create Shipment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateShipment;
