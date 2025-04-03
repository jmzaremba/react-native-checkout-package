import { createStore } from './store';

describe('createStore', () => {
  type TestState = { count: number };
  let store: ReturnType<typeof createStore<TestState>>;

  beforeEach(() => {
    store = createStore({ count: 0 });
  });

  it('SHOULD return the initial state from getState', () => {
    expect(store.getState()).toEqual({ count: 0 });
  });

  it('SHOULD update state with a partial object in setState', () => {
    store.setState({ count: 5 });
    expect(store.getState()).toEqual({ count: 5 });
  });

  it('SHOULD update state using updater function in setState', () => {
    store.setState((prev) => ({ count: prev.count + 1 }));
    expect(store.getState()).toEqual({ count: 1 });
  });

  it('SHOULD notify subscribed listeners on state update', () => {
    const listener = jest.fn();
    store.subscribe(listener);
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('SHOULD stop notifying listeners after unsubscribe', () => {
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.setState({ count: 3 });
    expect(listener).not.toHaveBeenCalled();
  });
});
