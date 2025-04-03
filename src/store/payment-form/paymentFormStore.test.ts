import {
  validateCardNumber,
  validateCVC,
  validateExpiry,
} from '../../utils/validators/validators';
import {
  getState,
  setValue,
  setTouched,
  validateField,
  validateAll,
  setSubmitting,
  subscribe,
} from './paymentFormStore';

jest.mock('../../utils/validators/validators');

describe('paymentFormStore', () => {
  beforeEach(() => {
    setValue('cardNumber', '');
    setValue('expiry', '');
    setValue('cvc', '');
    setSubmitting(false);
  });

  it('SHOULD set field values correctly', () => {
    setValue('cardNumber', '4242424242424242');
    expect(getState().values.cardNumber).toBe('4242424242424242');
  });

  it('SHOULD mark field as touched', () => {
    setTouched('expiry');
    expect(getState().touched.expiry).toBe(true);
  });

  it('SHOULD validate a single field and updates error/valid state', () => {
    (validateCardNumber as jest.Mock).mockReturnValueOnce('');
    setValue('cardNumber', '4242424242424242');
    validateField('cardNumber');
    expect(validateCardNumber).toHaveBeenCalledWith('4242424242424242');
    expect(getState().errors.cardNumber).toBe('');
    expect(getState().valid.cardNumber).toBe(true);
  });

  it('SHOULD mark all fields as touched and returns true when all are valid', () => {
    (validateCardNumber as jest.Mock).mockReturnValue('');
    (validateCVC as jest.Mock).mockReturnValue('');
    (validateExpiry as jest.Mock).mockReturnValue('');

    const result = validateAll();
    expect(result).toBe(true);
    expect(getState().touched.cardNumber).toBe(true);
    expect(getState().valid.cvc).toBe(true);
  });

  it('SHOULD return false when at least one field is invalid', () => {
    (validateCardNumber as jest.Mock).mockReturnValue('Invalid');
    (validateCVC as jest.Mock).mockReturnValue('');
    (validateExpiry as jest.Mock).mockReturnValue('');

    const result = validateAll();
    expect(result).toBe(false);
    expect(getState().valid.cardNumber).toBe(false);
    expect(getState().errors.cardNumber).toBe('Invalid');
  });

  it('SHOULD set isSubmitting state correctly', () => {
    setSubmitting(true);
    expect(getState().isSubmitting).toBe(true);
    setSubmitting(false);
    expect(getState().isSubmitting).toBe(false);
  });

  it('SHOULD call listeners on state update', () => {
    const listener = jest.fn();
    const unsubscribe = subscribe(listener);
    setValue('cardNumber', '1234');
    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });
});
