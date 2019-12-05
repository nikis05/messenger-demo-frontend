import { createStore, createHook } from 'react-sweet-state';

const AuthStore = createStore({
  initialState: { authorized: false },
  actions: {
    setAuthorized: () => () => {},
    setDeauthorized: () => () => {}
  }
});

export const useAuth = createHook(AuthStore);
