/* eslint-disable prettier/prettier */
import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-checkout-package' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const CheckoutPackage = NativeModules.CheckoutPackage
  ? NativeModules.CheckoutPackage
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function multiply(a: number, b: number): Promise<number> {
  return CheckoutPackage.multiply(a, b);
}

export { PaymentForm } from './components/payment-form/PaymentForm';
export { usePaymentForm } from './hooks/use-payment-form/usePaymentForm';
export { type Theme } from './utils/theme';
export { type Localisation } from './utils/localisation';
