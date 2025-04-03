import {
  validateCardNumber,
  validateCVC,
  validateExpiry,
} from '../../utils/validators/validators';

export type Field = 'cardNumber' | 'expiry' | 'cvc';

export type State = {
  values: Record<Field, string>;
  touched: Record<Field, boolean>;
  errors: Record<Field, string>;
  valid: Record<Field, boolean>;
  isSubmitting: boolean;
};

type Listener = () => void;

const state: State = {
  values: { cardNumber: '', expiry: '', cvc: '' },
  touched: { cardNumber: false, expiry: false, cvc: false },
  errors: { cardNumber: '', expiry: '', cvc: '' },
  valid: { cardNumber: false, expiry: false, cvc: false },
  isSubmitting: false,
};

const listeners = new Set<Listener>();

export const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getState = () => state;

export const setValue = (field: Field, value: string) => {
  state.values[field] = value;
  listeners.forEach((listener) => listener());
};

export const setTouched = (field: Field) => {
  state.touched[field] = true;
  listeners.forEach((listener) => listener());
};

export const validateField = (field: Field) => {
  const value = state.values[field];
  let error = '';
  if (field === 'cardNumber') error = validateCardNumber(value);
  if (field === 'expiry') error = validateExpiry(value);
  if (field === 'cvc') error = validateCVC(value);
  state.errors[field] = error;
  state.valid[field] = error === '';
  listeners.forEach((listener) => listener());
};

export const validateAll = () => {
  let allValid = true;
  (['cardNumber', 'expiry', 'cvc'] as Field[]).forEach((field) => {
    setTouched(field);
    validateField(field);
    if (!state.valid[field]) allValid = false;
  });
  return allValid;
};

export const setSubmitting = (val: boolean) => {
  state.isSubmitting = val;
  listeners.forEach((listener) => listener());
};
