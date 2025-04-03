import { validateCardNumber, validateExpiry, validateCVV } from './validators';

describe('validators', () => {
  describe('validateCardNumber', () => {
    it('SHOULD return error if empty', () => {
      expect(validateCardNumber('')).toBe('Card number is required');
    });

    it('SHOULD return error if not 16 digits', () => {
      expect(validateCardNumber('123456789012')).toBe('Invalid card number');
      expect(validateCardNumber('123456789012345')).toBe('Invalid card number');
      expect(validateCardNumber('12345678901234567')).toBe(
        'Invalid card number'
      );
    });

    it('SHOULD return error if contains non-digit characters', () => {
      expect(validateCardNumber('1234abcd5678efgh')).toBe(
        'Invalid card number'
      );
    });

    it('SHOULD return empty string if valid 16-digit number', () => {
      expect(validateCardNumber('4242424242424242')).toBe('');
    });
  });

  describe('validateExpiry', () => {
    it('SHOULD return error if empty', () => {
      expect(validateExpiry('')).toBe('Expiry is required');
    });

    it('SHOULD return error if not in MM/YY format', () => {
      expect(validateExpiry('12-24')).toBe('Invalid expiry format');
      expect(validateExpiry('1224')).toBe('Invalid expiry format');
      expect(validateExpiry('1/24')).toBe('Invalid expiry format');
      expect(validateExpiry('12/2024')).toBe('Invalid expiry format');
    });

    it('SHOULD return error if month is out of range', () => {
      expect(validateExpiry('00/25')).toBe('Invalid expiry month');
      expect(validateExpiry('13/25')).toBe('Invalid expiry month');
    });

    it('SHOULD return error if expiry date is in the past', () => {
      const pastYear = String(new Date().getFullYear() - 1).slice(-2);
      expect(validateExpiry(`12/${pastYear}`)).toBe('Card has expired');
    });

    it('SHOULD return error if current year but past month', () => {
      const now = new Date();
      const year = String(now.getFullYear()).slice(-2);
      const pastMonth = String(now.getMonth()).padStart(2, '0');
      expect(validateExpiry(`${pastMonth}/${year}`)).toBe('Card has expired');
    });

    it('SHOULD return empty string for valid future MM/YY', () => {
      const now = new Date();
      const futureMonth = String((now.getMonth() + 2) % 12 || 12).padStart(
        2,
        '0'
      );
      const futureYear = (
        now.getMonth() === 11 ? now.getFullYear() + 2 : now.getFullYear() + 1
      )
        .toString()
        .slice(-2);

      const futureExpiry = `${futureMonth}/${futureYear}`;
      expect(validateExpiry(futureExpiry)).toBe('');
    });
  });

  describe('validateCVV', () => {
    it('SHOULD return error if empty', () => {
      expect(validateCVV('')).toBe('CVV is required');
    });

    it('SHOULD return error if length is invalid', () => {
      expect(validateCVV('12')).toBe('Invalid CVV');
      expect(validateCVV('12345')).toBe('Invalid CVV');
    });

    it('SHOULD return error if contains non-digit characters', () => {
      expect(validateCVV('12a')).toBe('Invalid CVV');
      expect(validateCVV('abcd')).toBe('Invalid CVV');
    });

    it('SHOULD return empty string for valid 3 or 4 digit CVV', () => {
      expect(validateCVV('123')).toBe('');
      expect(validateCVV('1234')).toBe('');
    });
  });
});
