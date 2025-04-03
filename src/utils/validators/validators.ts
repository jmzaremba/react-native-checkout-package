export const validateCardNumber = (value: string) => {
  if (!value) return 'Card number is required';
  if (!/^\d{16}$/.test(value)) return 'Invalid card number';
  return '';
};

export const validateExpiry = (value: string): string => {
  if (!value) return 'Expiry is required';
  if (!/^\d{2}\/\d{2}$/.test(value)) return 'Invalid expiry format';

  const [monthStr, yearStr] = value.split('/');
  const month = Number(monthStr);
  const year = Number('20' + yearStr);

  if (isNaN(month) || isNaN(year)) return 'Invalid expiry date';
  if (month < 1 || month > 12) return 'Invalid expiry month';

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (year < currentYear) return 'Card has expired';

  if (year === currentYear && month < currentMonth) return 'Card has expired';

  return '';
};

export const validateCVV = (value: string) => {
  if (!value) return 'CVV is required';
  if (!/^\d{3,4}$/.test(value)) return 'Invalid CVV';
  return '';
};
