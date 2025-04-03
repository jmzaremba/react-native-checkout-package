import { createStore } from '../store';

export type Field = 'cardNumber' | 'expiry' | 'cvv';

type FieldMap = Record<Field, string>;
type BoolMap = Record<Field, boolean>;

type PaymentFormState = {
  values: FieldMap;
  touched: BoolMap;
  errors: FieldMap;
  valid: BoolMap;
  isSubmitting: boolean;
};

export const initialPaymentFormState: PaymentFormState = {
  values: { cardNumber: '', expiry: '', cvv: '' },
  touched: { cardNumber: false, expiry: false, cvv: false },
  errors: { cardNumber: '', expiry: '', cvv: '' },
  valid: { cardNumber: false, expiry: false, cvv: false },
  isSubmitting: false,
};

export const paymentFormStore = createStore<PaymentFormState>(
  initialPaymentFormState
);
