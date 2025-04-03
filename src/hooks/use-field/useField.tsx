import { useSyncExternalStore } from 'react';
import {
  getState,
  subscribe,
  type Field,
} from '../../store/payment-form/paymentFormStore';

const useFieldValue = (field: Field) =>
  useSyncExternalStore(subscribe, () => getState().values[field]);

const useFieldError = (field: Field) =>
  useSyncExternalStore(subscribe, () => getState().errors[field]);

const useFieldTouched = (field: Field) =>
  useSyncExternalStore(subscribe, () => getState().touched[field]);

export const useField = (field: Field) => {
  return {
    value: useFieldValue(field),
    error: useFieldError(field),
    touched: useFieldTouched(field),
  };
};
