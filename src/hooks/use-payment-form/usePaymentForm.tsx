import { useCallback } from 'react';
import { paymentFormStore } from '../../store/payment-form/paymentFormStore';
import {
  validateAll,
  setSubmitting,
} from '../../store/payment-form/paymentFormActions';
import { request } from '../../utils/network/network';
import { useKeys } from '../../utils/keys';

type UsePaymentFormProps = {
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
};

export const usePaymentForm = ({ onSuccess, onError }: UsePaymentFormProps) => {
  const { publicKey } = useKeys();

  const isSubmitting = paymentFormStore.useStore((s) => s.isSubmitting);

  const submit = useCallback(async () => {
    setSubmitting(true);
    try {
      const valid = validateAll();
      if (!valid) {
        setSubmitting(false);
        return onError('Validation failed');
      }

      const { cardNumber, expiry, cvv } = paymentFormStore.getState().values;

      const number = Number(cardNumber);
      const [month, yearSuffix] = expiry.split('/');
      const expiry_month = Number(month);
      const expiry_year = Number('20' + yearSuffix);

      const body = JSON.stringify({
        type: 'card',
        number,
        expiry_month,
        expiry_year,
        cvv,
      });

      const data = await request(
        { path: '/tokens', body, method: 'POST' },
        publicKey
      );

      if (data.error_type === 'request_invalid') {
        throw new Error(data.error_codes[0]);
      }

      onSuccess(data.token);
    } catch (err: any) {
      onError(`${err}`);
    } finally {
      setSubmitting(false);
    }
  }, [publicKey, onSuccess, onError]);

  return { isSubmitting, submit };
};
