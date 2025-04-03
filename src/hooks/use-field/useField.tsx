import {
  paymentFormStore,
  type Field,
} from '../../store/payment-form/paymentFormStore';

export const useField = (field: Field) => {
  const value = paymentFormStore.useStore((state) => state.values[field]);
  const error = paymentFormStore.useStore((state) => state.errors[field]);
  const touched = paymentFormStore.useStore((state) => state.touched[field]);
  return { value, error, touched };
};
