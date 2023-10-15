import { store } from "../app.js";

export const createStore = () => {
  const state = {};
  const listener = {};

  const getState = (key) => state[key];

  const setState = (key, newState) => {
    state[key] = newState;
    if (listener[key]) {
      listener[key].forEach((callback) => callback());
    }
  };

  const subscribe = (key, callback) => {
    !listener[key]
      ? (listener[key] = [callback])
      : listener[key].push(callback);
  };

  return {
    getState,
    setState,
    subscribe,
  };
};

export const atom = (store, key, initialValue) => {
  (() => {
    if (!store.getState(key) && initialValue !== undefined) {
      store.setState(key, initialValue);
    }
  })();

  const getState = () => store.getState(key);
  const setState = (newState) => store.setState(key, newState);
  const subscribe = (callback) => store.subscribe(key, callback);

  return {
    getState,
    setState,
    subscribe,
  };
};

export const useAtom = (key, initialValue) => {
  const { getState, setState, subscribe } = atom(store, key, initialValue);

  return [getState, setState, subscribe];
};
