import { Tokens } from '@api';
import { client } from 'apollo';
import { createHook, createStore } from 'react-sweet-state';

const initAccessToken = localStorage.getItem('accessToken');
const initRefreshToken = localStorage.getItem('refreshToken');

const tokensBox = {
  current:
    initAccessToken && initRefreshToken
      ? { accessToken: initAccessToken, refreshToken: initRefreshToken }
      : null
};

export const getTokens = () => tokensBox.current;
export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  tokensBox.current!.accessToken = accessToken;
};

const AuthStore = createStore({
  initialState: { isAuthorized: tokensBox.current !== null },
  actions: {
    setAuthorized: ({ accessToken, refreshToken }: Tokens) => ({
      setState
    }) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      tokensBox.current = { accessToken, refreshToken };
      setState({ isAuthorized: true });
    },
    setDeauthorized: () => async ({ setState }) => {
      localStorage.clear();
      tokensBox.current = null;
      setState({ isAuthorized: false });
      await client.resetStore();
    }
  }
});

export const useAuth = createHook(AuthStore);
