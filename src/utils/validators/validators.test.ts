import { validateCardNumber, validateExpiry, validateCVC } from './validators';

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
      expect(validateExpiry('12-24')).toBe('Invalid expiry date');
      expect(validateExpiry('1224')).toBe('Invalid expiry date');
      expect(validateExpiry('1/24')).toBe('Invalid expiry date');
      expect(validateExpiry('12/2024')).toBe('Invalid expiry date');
    });

    it('SHOULD return empty string for valid MM/YY', () => {
      expect(validateExpiry('12/24')).toBe('');
      expect(validateExpiry('01/30')).toBe('');
    });
  });

  describe('validateCVC', () => {
    it('SHOULD return error if empty', () => {
      expect(validateCVC('')).toBe('CVC is required');
    });

    it('SHOULD return error if length is invalid', () => {
      expect(validateCVC('12')).toBe('Invalid CVC');
      expect(validateCVC('12345')).toBe('Invalid CVC');
    });

    it('SHOULD return error if contains non-digit characters', () => {
      expect(validateCVC('12a')).toBe('Invalid CVC');
      expect(validateCVC('abcd')).toBe('Invalid CVC');
    });

    it('SHOULD return empty string for valid 3 or 4 digit CVC', () => {
      expect(validateCVC('123')).toBe('');
      expect(validateCVC('1234')).toBe('');
    });
  });
});
