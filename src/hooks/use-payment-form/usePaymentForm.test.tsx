import { renderHook, act } from '@testing-library/react-hooks';
import { usePaymentForm } from './usePaymentForm';
import {
  getState,
  setSubmitting,
  validateAll,
} from '../../store/payment-form/paymentFormStore';
import { request } from '../../utils/network/network';

jest.mock('../../utils/keys', () => ({
  useKeys: () => ({ publicKey: 'pk_test_123' }),
}));

jest.mock('../../store/payment-form/paymentFormStore', () => ({
  subscribe: jest.fn((listener) => {
    // simulate subscription to state
    listener();
    // eslint-disable-next-line prettier/prettier
    return () => { };
  }),
  getState: jest.fn(),
  validateAll: jest.fn(),
  setSubmitting: jest.fn(),
}));

jest.mock('../../utils/network/network', () => ({
  request: jest.fn(),
}));

describe('usePaymentForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    (getState as jest.Mock).mockReturnValue({
      isSubmitting: false,
      values: { cardNumber: '', expiry: '', cvc: '' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SHOULD call onError if validation fails', async () => {
    (validateAll as jest.Mock).mockReturnValue(false);

    (getState as jest.Mock).mockReturnValue({
      isSubmitting: false,
      values: { cardNumber: '', expiry: '', cvc: '' },
    });

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(validateAll).toHaveBeenCalled();
    expect(setSubmitting).toHaveBeenCalledWith(true);
    expect(mockOnError).toHaveBeenCalledWith('Validation failed');
    expect(setSubmitting).toHaveBeenCalledWith(false);
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('SHOULD submit card details and calls onSuccess on success', async () => {
    (validateAll as jest.Mock).mockReturnValue(true);
    (getState as jest.Mock).mockReturnValue({
      values: {
        cardNumber: '4242424242424242',
        expiry: '12/26',
        cvc: '123',
      },
    });
    (request as jest.Mock).mockResolvedValue({ token: 'tok_abc123' });

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(setSubmitting).toHaveBeenCalledWith(true);
    expect(request).toHaveBeenCalledWith(
      {
        path: '/tokens',
        method: 'POST',
        body: JSON.stringify({
          type: 'card',
          number: 4242424242424242,
          expiry_month: 12,
          expiry_year: 2026,
          cvv: '123',
        }),
      },
      'pk_test_123'
    );
    expect(mockOnSuccess).toHaveBeenCalledWith('tok_abc123');
    expect(mockOnError).not.toHaveBeenCalled();
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });

  it('SHOULD call onError if API returns error_type', async () => {
    (validateAll as jest.Mock).mockReturnValue(true);
    (getState as jest.Mock).mockReturnValue({
      values: {
        cardNumber: '4242424242424242',
        expiry: '12/26',
        cvc: '123',
      },
    });
    (request as jest.Mock).mockResolvedValue({
      error_type: 'request_invalid',
      error_codes: ['card_number_invalid'],
    });

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockOnError).toHaveBeenCalledWith('Error: card_number_invalid');
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });

  it('SHOULD call onError if request throws', async () => {
    (validateAll as jest.Mock).mockReturnValue(true);
    (getState as jest.Mock).mockReturnValue({
      values: {
        cardNumber: '4242424242424242',
        expiry: '12/26',
        cvc: '123',
      },
    });
    (request as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });
    expect(mockOnError).toHaveBeenCalledWith('Error: Network error');
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });
});
