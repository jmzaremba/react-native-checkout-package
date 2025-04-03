import React from 'react';
import {
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export type Theme = {
  inputLabelStyle?: StyleProp<TextStyle>;
  inputErrorStyle?: StyleProp<TextStyle>;
  inputTextStyle?: StyleProp<ViewStyle>;
  inputTextErrorStyle?: StyleProp<ViewStyle>;
  inputTextSuccessStyle?: StyleProp<ViewStyle>;
};

export const defaultTheme = StyleSheet.create({
  inputLabelStyle: {
    fontSize: 16,
  },
  inputErrorStyle: {
    color: 'crimson',
  },
  inputTextErrorStyle: {
    borderColor: 'crimson',
  },
  inputTextSuccessStyle: {
    borderColor: 'green',
  },
  inputTextStyle: {
    fontSize: 16,
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    minWidth: '48%',
  },
});

export const ThemeContext = React.createContext<Theme>({});
export const useThemeContext = () => React.useContext(ThemeContext);
