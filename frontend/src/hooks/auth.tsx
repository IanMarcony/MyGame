/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable react/prop-types */

import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

import Constants from '../utils/Constants';

interface AuthState {
  token: string;

  user: object;
}

interface SignInCredentials {
  email: string;

  password: string;
}

interface AuthContextData {
  user: object;

  signIn(credentials: SignInCredentials): Promise<void>;

  signOut(): void;
}

type AuthProviderProps = React.PropsWithChildren;

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(Constants.storage.token);

    const user = localStorage.getItem(Constants.storage.user);

    if (token && user) {
      return {
        token,

        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,

      password,
    });

    const { user, token } = response.data;

    localStorage.setItem(Constants.storage.token, token);

    localStorage.setItem(Constants.storage.user, JSON.stringify(user));

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(Constants.storage.token);

    localStorage.removeItem(Constants.storage.user);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = function (): AuthContextData {
  const context = useContext<AuthContextData>(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
