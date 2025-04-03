import { StyleSheet, View } from 'react-native';
import { InputField } from '../input-field/InputField';
import { useLocalisation } from '../../utils/localisation';
import { useEffect } from 'react';
import { resetPaymentForm } from '../../store/payment-form/paymentFormActions';

export const PaymentForm = () => {
  const localisation = useLocalisation();
  useEffect(() => {
    return () => {
      resetPaymentForm();
    };
  }, []);

  return (
    <View style={styles.container}>
      <InputField
        field="cardNumber"
        label={localisation.cardNumberLabel}
        placeholder={localisation.cardNumberPlaceholder}
      />
      <InputField
        field="expiry"
        label={localisation.expiryLabel}
        placeholder={localisation.expiryPlaceholder}
      />
      <InputField
        field="cvv"
        label={localisation.cvvLabel}
        placeholder={localisation.cvvPlaceholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
