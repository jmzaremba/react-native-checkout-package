import { initialPaymentFormState, paymentFormStore } from './paymentFormStore';
import {
  validateCardNumber,
  validateCVV,
  validateExpiry,
} from '../../utils/validators/validators';

import type { Field } from './paymentFormStore';

const validators: Record<Field, (value: string) => string> = {
  cardNumber: validateCardNumber,
  expiry: validateExpiry,
  cvv: validateCVV,
};

export function setValue(field: Field, value: string) {
  paymentFormStore.setState((prev) => ({
    values: { ...prev.values, [field]: value },
  }));
}

export function setTouched(field: Field) {
  paymentFormStore.setState((prev) => ({
    touched: { ...prev.touched, [field]: true },
  }));
}

export function validateField(field: Field) {
  const { values } = paymentFormStore.getState();
  const error = validators[field](values[field]);
  paymentFormStore.setState((prev) => ({
    errors: { ...prev.errors, [field]: error },
    valid: { ...prev.valid, [field]: error === '' },
  }));
}

export function validateAll(): boolean {
  let allValid = true;
  (['cardNumber', 'expiry', 'cvv'] as Field[]).forEach((field) => {
    setTouched(field);
    validateField(field);
    const { valid } = paymentFormStore.getState();
    if (!valid[field]) allValid = false;
  });
  return allValid;
}

export function setSubmitting(value: boolean) {
  paymentFormStore.setState({ isSubmitting: value });
}

export function resetPaymentForm() {
  paymentFormStore.setState(initialPaymentFormState);
}
