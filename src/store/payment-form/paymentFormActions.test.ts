import {
  setValue,
  setTouched,
  validateField,
  validateAll,
  setSubmitting,
  resetPaymentForm,
} from './paymentFormActions';

import { paymentFormStore, initialPaymentFormState } from './paymentFormStore';

jest.mock('../../utils/validators/validators', () => ({
  validateCardNumber: jest.fn(() => ''),
  validateExpiry: jest.fn(() => ''),
  validateCVV: jest.fn(() => ''),
}));

describe('paymentFormActions', () => {
  afterEach(() => {
    resetPaymentForm();
  });

  it('SHOULD set the value of a field in state', () => {
    setValue('cardNumber', '4242424242424242');
    const { values } = paymentFormStore.getState();
    expect(values.cardNumber).toBe('4242424242424242');
  });

  it('SHOULD mark a field as touched', () => {
    setTouched('cvv');
    const { touched } = paymentFormStore.getState();
    expect(touched.cvv).toBe(true);
  });

  it('SHOULD validate a single field and update errors and valid state', () => {
    setValue('expiry', '12/30');
    validateField('expiry');
    const { errors, valid } = paymentFormStore.getState();
    expect(errors.expiry).toBe('');
    expect(valid.expiry).toBe(true);
  });

  it('SHOULD validate all fields, set touched, and return true when all are valid', () => {
    setValue('cardNumber', '4242');
    setValue('expiry', '12/30');
    setValue('cvv', '123');

    const result = validateAll();

    const { touched, valid } = paymentFormStore.getState();
    expect(result).toBe(true);
    expect(touched.cardNumber).toBe(true);
    expect(valid.cardNumber).toBe(true);
  });

  it('SHOULD toggle the submitting state using setSubmitting', () => {
    setSubmitting(true);
    expect(paymentFormStore.getState().isSubmitting).toBe(true);

    setSubmitting(false);
    expect(paymentFormStore.getState().isSubmitting).toBe(false);
  });

  it('SHOULD reset the form state back to the initial default values', () => {
    setValue('cardNumber', '1234');
    setTouched('cardNumber');
    setSubmitting(true);

    resetPaymentForm();

    const state = paymentFormStore.getState();
    expect(state).toStrictEqual(initialPaymentFormState);
  });
});
