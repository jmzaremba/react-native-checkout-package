import { render, fireEvent } from '@testing-library/react-native';
import { InputField } from './InputField';
import {
  setValue,
  setTouched,
  validateField,
} from '../../store/payment-form/paymentFormStore';
import { useField } from '../../hooks/use-field/useField';

jest.mock('../../hooks/use-field/useField', () => ({
  useField: jest.fn(),
}));

jest.mock('../../store/payment-form/paymentFormStore', () => ({
  setValue: jest.fn(),
  setTouched: jest.fn(),
  validateField: jest.fn(),
}));

jest.mock('../../utils/theme', () => ({
  useThemeContext: () => ({
    inputLabelStyle: { color: 'black' },
    inputErrorStyle: { color: 'red' },
    inputTextStyle: { borderColor: 'grey' },
    inputTextErrorStyle: { borderColor: 'crimson' },
    inputTextSuccessStyle: { borderColor: 'green' },
  }),
}));

describe('InputField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('SHOULD render label, placeholder, and value correctly', () => {
    (useField as jest.Mock).mockReturnValue({
      value: '1234',
      error: '',
      touched: false,
    });

    const { getByPlaceholderText, getByText } = render(
      <InputField
        field="cardNumber"
        label="Card Number"
        placeholder="1234 5678"
      />
    );

    expect(getByText('Card Number')).toBeTruthy();
    expect(getByPlaceholderText('1234 5678').props.value).toBe('1234');
  });

  it('SHOULD display error text when field has error and touched', () => {
    (useField as jest.Mock).mockReturnValue({
      value: '123',
      error: 'Invalid card number',
      touched: true,
    });

    const { getByText } = render(
      <InputField
        field="cardNumber"
        label="Card Number"
        placeholder="1234 5678"
      />
    );

    expect(getByText('Invalid card number')).toBeTruthy();
  });

  it('SHOULD call setValue when text changes', () => {
    (useField as jest.Mock).mockReturnValue({
      value: '',
      error: '',
      touched: false,
    });

    const { getByPlaceholderText } = render(
      <InputField
        field="cardNumber"
        label="Card Number"
        placeholder="Enter card"
      />
    );

    fireEvent.changeText(getByPlaceholderText('Enter card'), '4242');

    expect(setValue).toHaveBeenCalledWith('cardNumber', '4242');
  });

  it('SHOULD call setTouched and validateField on blur', () => {
    (useField as jest.Mock).mockReturnValue({
      value: '',
      error: '',
      touched: false,
    });

    const { getByPlaceholderText } = render(
      <InputField field="expiry" label="Expiry" placeholder="MM/YY" />
    );

    fireEvent(getByPlaceholderText('MM/YY'), 'blur');

    expect(setTouched).toHaveBeenCalledWith('expiry');
    expect(validateField).toHaveBeenCalledWith('expiry');
  });

  it('SHOULD apply success style if field is valid', () => {
    (useField as jest.Mock).mockReturnValue({
      value: '4242424242424242',
      error: '',
      touched: true,
    });

    const { getByPlaceholderText } = render(
      <InputField
        field="cardNumber"
        label="Card Number"
        placeholder="Card number"
      />
    );

    const input = getByPlaceholderText('Card number');
    expect(input.props.style).toEqual([
      { borderColor: 'grey' },
      { borderColor: 'green' },
    ]);
  });

  it('SHUOLD apply error style if field has error', () => {
    (useField as jest.Mock).mockReturnValue({
      value: '1111',
      error: 'Too short',
      touched: true,
    });

    const { getByPlaceholderText } = render(
      <InputField
        field="cardNumber"
        label="Card Number"
        placeholder="Card number"
      />
    );

    const input = getByPlaceholderText('Card number');
    expect(input.props.style).toEqual([
      { borderColor: 'grey' },
      { borderColor: 'crimson' },
    ]);
  });
});
