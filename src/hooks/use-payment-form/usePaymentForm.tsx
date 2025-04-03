import { useCallback, useSyncExternalStore } from 'react';
import {
  subscribe,
  getState,
  validateAll,
  setSubmitting,
} from '../../store/payment-form/paymentFormStore';
import { request } from '../../utils/network/network';
import { useKeys } from '../../utils/keys';

export const usePaymentForm = ({
  onSuccess,
  onError,
}: {
  onSuccess: (token: string) => void;
  onError: (error: string) => void;
}) => {
  const { publicKey } = useKeys();

  const isSubmitting = useSyncExternalStore(
    subscribe,
    () => getState().isSubmitting
  );

  const submit = useCallback(async () => {
    setSubmitting(true);
    try {
      const valid = validateAll();
      if (!valid) {
        setSubmitting(false);
        return onError('Validation failed');
      }

      const number = Number(getState().values.cardNumber);
      const expiry_month = Number(getState().values.expiry.split('/')[0]);
      const expiry_year = Number('20' + getState().values.expiry.split('/')[1]);
      const cvv = getState().values.cvc;

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
