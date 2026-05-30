import { LoginCredentials, AuthResponse, User } from '@types/index';
import { localStorage } from '@utils/localStorage';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: AuthResponse = await response.json();
      localStorage.setToken(data.token);
      localStorage.setUser(data.user);
      return data;
    } catch (error) {
      throw new Error('Login failed: Invalid credentials');
    }
  }

  async logout(): Promise<void> {
    localStorage.removeToken();
    localStorage.removeUser();
  }

  async validateToken(): Promise<User | null> {
    const token = localStorage.getToken();
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        localStorage.removeToken();
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getToken();
  }

  getCurrentUser(): User | null {
    return localStorage.getUser() as User | null;
  }
}

export default new AuthService();
