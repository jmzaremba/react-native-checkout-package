export const validateCardNumber = (value: string) => {
  if (!value) return 'Card number is required';
  if (!/^\d{16}$/.test(value)) return 'Invalid card number';
  return '';
};

export const validateExpiry = (value: string) => {
  if (!value) return 'Expiry is required';
  if (!/^\d{2}\/\d{2}$/.test(value)) return 'Invalid expiry date';
  return '';
};

export const validateCVC = (value: string) => {
  if (!value) return 'CVC is required';
  if (!/^\d{3,4}$/.test(value)) return 'Invalid CVC';
  return '';
};
