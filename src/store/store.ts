import { useSyncExternalStore } from 'react';

type Listener = () => void;

export function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener>();

  const getState = () => state;

  const setState = (update: Partial<T> | ((prev: T) => Partial<T>)) => {
    const nextPartial = typeof update === 'function' ? update(state) : update;
    state = { ...state, ...nextPartial };
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const useStore = <U>(selector: (state: T) => U): U => {
    return useSyncExternalStore(subscribe, () => selector(state));
  };

  return { getState, setState, subscribe, useStore };
}
