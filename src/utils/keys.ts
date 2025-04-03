import React from 'react';

export type Keys = {
  publicKey: string;
};

export const defaultKeys: Keys = {
  publicKey: '',
};

export const KeysContext = React.createContext<Keys>(defaultKeys);
export const useKeys = () => React.useContext(KeysContext);
