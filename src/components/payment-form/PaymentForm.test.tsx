import { render } from '@testing-library/react-native';
import { PaymentForm } from './PaymentForm';
import { Text } from 'react-native';
import * as paymentFormActions from '../../store/payment-form/paymentFormActions';

const MockInputField = ({
  field,
  label,
  placeholder,
}: {
  field: string;
  label: string;
  placeholder: string;
}) => {
  return (
    <Text>
      {label} - {placeholder} [{field}]
    </Text>
  );
};

jest.mock('../../utils/localisation', () => ({
  useLocalisation: () => ({
    cardNumberLabel: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryLabel: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvvLabel: 'CVV',
    cvvPlaceholder: '123',
  }),
}));

jest.mock('../input-field/InputField', () => ({
  InputField: ({ field, label, placeholder }: any) => {
    return (
      <MockInputField field={field} label={label} placeholder={placeholder} />
    );
  },
}));

describe('PaymentForm', () => {
  it('SHOULD render all input fields with correct labels and placeholders from localisation', () => {
    const { getByText } = render(<PaymentForm />);

    expect(
      getByText('Card Number - 1234 5678 9012 3456 [cardNumber]')
    ).toBeTruthy();
    expect(getByText('Expiry Date - MM/YY [expiry]')).toBeTruthy();
    expect(getByText('CVV - 123 [cvv]')).toBeTruthy();
  });

  it('SHOULD reset state on unmount ', () => {
    const resetStoreSpy = jest.spyOn(paymentFormActions, 'resetPaymentForm');
    const { unmount } = render(<PaymentForm />);
    unmount();
    expect(resetStoreSpy).toHaveBeenCalledTimes(1);
  });
});
