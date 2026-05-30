export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  },

  isValidZipCode: (zipCode: string): boolean => {
    const zipCodeRegex = /^[0-9]{4,10}$/;
    return zipCodeRegex.test(zipCode);
  },

  isValidPassword: (password: string): boolean => {
    return password.length >= 6;
  },

  isValidPrice: (price: number): boolean => {
    return price > 0 && !isNaN(price);
  },

  isValidWeight: (weight: number): boolean => {
    return weight > 0 && !isNaN(weight);
  }
};
