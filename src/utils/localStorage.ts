const TOKEN_KEY = 'glo_logistics_token';
const USER_KEY = 'glo_logistics_user';

export const localStorage = {
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  },

  setUser: (user: Record<string, unknown>): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  getUser: (): Record<string, unknown> | null => {
    if (typeof window !== 'undefined') {
      const user = window.localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  removeUser: (): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(USER_KEY);
    }
  },

  clear: (): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  }
};
