import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@services/index';
import { validators } from '@utils/validators';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validators.isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validators.isValidPassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await authService.login({ email, password });
      navigate('/shipments');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>🌍 GloLogistics</h1>
          <p>Logistics Solutions for a Connected Global Village</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
