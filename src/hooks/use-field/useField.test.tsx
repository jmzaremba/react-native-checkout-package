import { renderHook, act } from '@testing-library/react-hooks';
import { useField } from './useField';
import { type Field } from '../../store/payment-form/paymentFormStore';
import {
  setValue,
  setTouched,
  resetPaymentForm,
} from '../../store/payment-form/paymentFormActions';

describe('useField', () => {
  const field: Field = 'cardNumber';

  afterEach(() => {
    act(() => {
      resetPaymentForm();
    });
  });

  it('SHOULD return correct default value, error, and touched state', () => {
    const { result } = renderHook(() => useField(field));
    expect(result.current.value).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.touched).toBe(false);
  });

  it('SHOULD reflect updated field value from store', () => {
    const { result } = renderHook(() => useField(field));

    act(() => {
      setValue(field, '4242424242424242');
    });

    expect(result.current.value).toBe('4242424242424242');
  });

  it('SHOULD reflect touched state after calling setTouched', () => {
    const { result } = renderHook(() => useField(field));

    act(() => {
      setTouched(field);
    });

    expect(result.current.touched).toBe(true);
  });

  it('SHOULD stay in sync with store when multiple values change', () => {
    const { result } = renderHook(() => useField(field));

    act(() => {
      setValue(field, '4111111111111111');
      setTouched(field);
    });

    expect(result.current.value).toBe('4111111111111111');
    expect(result.current.touched).toBe(true);
    expect(result.current.error).toBe('');
  });

  it('SHOULD reset all field values after resetPaymentForm is called', () => {
    const { result } = renderHook(() => useField(field));

    act(() => {
      setValue(field, '4111111111111111');
      setTouched(field);
      resetPaymentForm();
    });

    expect(result.current.value).toBe('');
    expect(result.current.touched).toBe(false);
    expect(result.current.error).toBe('');
  });
});
