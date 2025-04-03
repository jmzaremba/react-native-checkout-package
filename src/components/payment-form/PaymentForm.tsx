import { StyleSheet, View } from 'react-native';
import { InputField } from '../input-field/InputField';
import { useLocalisation } from '../../utils/localisation';
import { useEffect } from 'react';
import { resetState } from '../../store/payment-form/paymentFormStore';

export const PaymentForm = () => {
  const localisation = useLocalisation();
  useEffect(() => {
    return () => {
      resetState();
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
        field="cvc"
        label={localisation.cvcLabel}
        placeholder={localisation.cvcPlaceholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
