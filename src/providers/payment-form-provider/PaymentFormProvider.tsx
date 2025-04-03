import React, { type PropsWithChildren } from 'react';

import { defaultTheme, ThemeContext, type Theme } from '../../utils/theme';
import {
  defaultLocalisation,
  LocalisationContext,
  type Localisation,
} from '../../utils/localisation';
import { KeysContext } from '../../utils/keys';

type Props = PropsWithChildren<{
  localisation?: Partial<Localisation>;
  publicKey: string;
  theme?: Partial<Theme>;
}>;
export const PaymentFormProvider: React.FC<Props> = ({
  children,
  localisation,
  publicKey,
  theme,
}) => {
  const mergedTheme = { ...defaultTheme, ...theme };
  const mergedLocalisation = { ...defaultLocalisation, ...localisation };
  const keyValue = { publicKey };
  return (
    <KeysContext.Provider value={keyValue}>
      <ThemeContext.Provider value={mergedTheme}>
        <LocalisationContext.Provider value={mergedLocalisation}>
          {children}
        </LocalisationContext.Provider>
      </ThemeContext.Provider>
    </KeysContext.Provider>
  );
};
