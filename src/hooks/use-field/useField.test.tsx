import { renderHook } from '@testing-library/react-hooks';
import { useField } from './useField';

jest.mock('../../store/payment-form/paymentFormStore', () => ({
  getState: jest.fn(),
  subscribe: jest.fn((listener) => {
    listener(); // simulate subscription fire
    // eslint-disable-next-line prettier/prettier
    return () => { };
  }),
}));

import { getState } from '../../store/payment-form/paymentFormStore';

describe('useField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('SHOULD return correct value, error, and touched state for a field', () => {
    (getState as jest.Mock).mockReturnValue({
      values: {
        cardNumber: '4242424242424242',
        expiry: '',
        cvc: '',
      },
      errors: {
        cardNumber: 'Invalid card',
        expiry: '',
        cvc: '',
      },
      touched: {
        cardNumber: true,
        expiry: false,
        cvc: false,
      },
    });

    const { result } = renderHook(() => useField('cardNumber'));

    expect(result.current.value).toBe('4242424242424242');
    expect(result.current.error).toBe('Invalid card');
    expect(result.current.touched).toBe(true);
  });

  it('SHOULD return empty string and false when field is untouched and empty', () => {
    (getState as jest.Mock).mockReturnValue({
      values: {
        cardNumber: '',
        expiry: '12/26',
        cvc: '',
      },
      errors: {
        cardNumber: '',
        expiry: '',
        cvc: '',
      },
      touched: {
        cardNumber: false,
        expiry: false,
        cvc: false,
      },
    });

    const { result } = renderHook(() => useField('expiry'));

    expect(result.current.value).toBe('12/26');
    expect(result.current.error).toBe('');
    expect(result.current.touched).toBe(false);
  });
});
