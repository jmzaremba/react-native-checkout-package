import { PaymentFormProvider } from '../../src/providers/payment-form-provider/PaymentFormProvider';
import Home from './Home';

export default function App() {
  return (
    <PaymentFormProvider publicKey="">
      <Home />
    </PaymentFormProvider>
  );
}
