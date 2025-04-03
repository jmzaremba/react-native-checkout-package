import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useThemeContext } from '../../utils/theme';
import { useField } from '../../hooks/use-field/useField';
import type { Field } from '../../store/payment-form/paymentFormStore';

import {
  setTouched,
  setValue,
  validateField,
} from '../../store/payment-form/paymentFormActions';

type Props = {
  field: Field;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<Props> = ({ field, label, placeholder }) => {
  const theme = useThemeContext();
  const { error, touched, value } = useField(field);

  const isValid = touched && error === '';

  const getInputStyle = (): StyleProp<ViewStyle> => {
    if (isValid) return [theme.inputTextStyle, theme.inputTextSuccessStyle];
    if (error) return [theme.inputTextStyle, theme.inputTextErrorStyle];
    return theme.inputTextStyle;
  };

  const inputStyle = getInputStyle();

  const onBlur = () => {
    setTouched(field);
    validateField(field);
  };

  const onChangeText = (text: string) => setValue(field, text);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={theme.inputLabelStyle}>{label}</Text>
        <Text style={theme.inputErrorStyle}>{error}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={inputStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
