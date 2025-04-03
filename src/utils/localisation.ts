import React from 'react';

export type Localisation = {
  cardNumberLabel: string;
  cardNumberPlaceholder: string;
  expiryLabel: string;
  expiryPlaceholder: string;
  cvvLabel: string;
  cvvPlaceholder: string;
  invalidCardError: string;
};

export const defaultLocalisation: Localisation = {
  cardNumberLabel: 'Card number',
  cardNumberPlaceholder: '4242 4242 4242 4242',
  expiryLabel: 'Expiry date',
  expiryPlaceholder: 'MM/YY',
  cvvLabel: 'CVV',
  cvvPlaceholder: 'CVV',
  invalidCardError: 'Invalid card number',
};

export const LocalisationContext =
  React.createContext<Localisation>(defaultLocalisation);
export const useLocalisation = () => React.useContext(LocalisationContext);
