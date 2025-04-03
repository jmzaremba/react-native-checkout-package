import { renderHook, act } from '@testing-library/react-hooks';
import { usePaymentForm } from './usePaymentForm';
import { paymentFormStore } from '../../store/payment-form/paymentFormStore';
import * as actions from '../../store/payment-form/paymentFormActions';
import { request } from '../../utils/network/network';

jest.mock('../../utils/keys', () => ({
  useKeys: () => ({ publicKey: 'pk_test_abc123' }),
}));

jest.mock('../../utils/network/network', () => ({
  request: jest.fn(),
}));

jest.mock('../../store/payment-form/paymentFormStore', () => {
  const state = {
    isSubmitting: false,
    values: {
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  };

  return {
    paymentFormStore: {
      getState: () => state,
      setState: (updater: any) => {
        Object.assign(
          state,
          typeof updater === 'function' ? updater(state) : updater
        );
      },
      useStore: (selector: any) => selector(state),
    },
  };
});

jest.mock('../../store/payment-form/paymentFormActions', () => ({
  validateAll: jest.fn(),
  setSubmitting: jest.fn(),
}));

describe('usePaymentForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    paymentFormStore.setState({
      isSubmitting: false,
      values: {
        cardNumber: '',
        expiry: '',
        cvv: '',
      },
    });
  });

  it('SHOULD expose the submitting state from the store', () => {
    paymentFormStore.setState({ isSubmitting: true });
    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );
    expect(result.current.isSubmitting).toBe(true);
  });

  it('SHOULD call onError if validation fails', async () => {
    (actions.validateAll as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(actions.setSubmitting).toHaveBeenCalledWith(true);
    expect(actions.validateAll).toHaveBeenCalled();
    expect(actions.setSubmitting).toHaveBeenCalledWith(false);
    expect(mockOnError).toHaveBeenCalledWith('Validation failed');
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('SHOULD call onSuccess when tokenization succeeds', async () => {
    (actions.validateAll as jest.Mock).mockReturnValue(true);

    paymentFormStore.setState({
      values: {
        cardNumber: '4242424242424242',
        expiry: '12/29',
        cvv: '123',
      },
    });

    (request as jest.Mock).mockResolvedValue({ token: 'tok_abc123' });

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(actions.setSubmitting).toHaveBeenCalledWith(true);
    expect(request).toHaveBeenCalledWith(
      {
        path: '/tokens',
        method: 'POST',
        body: JSON.stringify({
          type: 'card',
          number: 4242424242424242,
          expiry_month: 12,
          expiry_year: 2029,
          cvv: '123',
        }),
      },
      'pk_test_abc123'
    );

    expect(mockOnSuccess).toHaveBeenCalledWith('tok_abc123');
    expect(actions.setSubmitting).toHaveBeenCalledWith(false);
    expect(mockOnError).not.toHaveBeenCalled();
  });

  it('SHOULD call onError if request returns error_type', async () => {
    (actions.validateAll as jest.Mock).mockReturnValue(true);

    paymentFormStore.setState({
      values: {
        cardNumber: '4242424242424242',
        expiry: '01/30',
        cvv: '321',
      },
    });

    (request as jest.Mock).mockResolvedValue({
      error_type: 'request_invalid',
      error_codes: ['invalid_card_number'],
    });

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(mockOnError).toHaveBeenCalledWith('Error: invalid_card_number');
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(actions.setSubmitting).toHaveBeenCalledWith(false);
  });

  it('SHOULD call onError if request throws', async () => {
    (actions.validateAll as jest.Mock).mockReturnValue(true);

    paymentFormStore.setState({
      values: {
        cardNumber: '4242424242424242',
        expiry: '06/28',
        cvv: '123',
      },
    });

    (request as jest.Mock).mockRejectedValue(new Error('Request failed'));

    const { result } = renderHook(() =>
      usePaymentForm({ onSuccess: mockOnSuccess, onError: mockOnError })
    );

    await act(async () => {
      await result.current.submit();
    });

    expect(mockOnError).toHaveBeenCalledWith('Error: Request failed');
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(actions.setSubmitting).toHaveBeenCalledWith(false);
  });
});
