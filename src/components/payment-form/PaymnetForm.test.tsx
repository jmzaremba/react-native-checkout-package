import { render } from '@testing-library/react-native';
import { PaymentForm } from './PaymentForm';

jest.mock('../../utils/localisation', () => ({
  useLocalisation: () => ({
    cardNumberLabel: 'Card Number',
    cardNumberPlaceholder: '1234 5678 9012 3456',
    expiryLabel: 'Expiry Date',
    expiryPlaceholder: 'MM/YY',
    cvcLabel: 'CVC',
    cvcPlaceholder: '123',
  }),
}));

jest.mock('../input-field/InputField', () => ({
  InputField: ({ field, label, placeholder }: any) => {
    return (
      <MockInputField field={field} label={label} placeholder={placeholder} />
    );
  },
}));

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

import { Text } from 'react-native';

describe('PaymentForm', () => {
  it('SHOULD render all input fields with correct labels and placeholders from localisation', () => {
    const { getByText } = render(<PaymentForm />);

    expect(
      getByText('Card Number - 1234 5678 9012 3456 [cardNumber]')
    ).toBeTruthy();
    expect(getByText('Expiry Date - MM/YY [expiry]')).toBeTruthy();
    expect(getByText('CVC - 123 [cvc]')).toBeTruthy();
  });
});
