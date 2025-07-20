import { createContext, useState, useEffect } from "react"
import { registerAccount } from '../services/authService'

import { loginAccount } from '../services/authService'
import api from '../../lib/axios'
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    token: null,
    authenticated: false,
    authChecked: false,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("JWT_TOKEN");
      console.log("Stored:", token);

      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setUser({
          token,
          authenticated: true,
          authChecked: true,
        });
      } else {
        setUser({
          token: null,
          authenticated: false,
          authChecked: true,
        });
      }
    };

    loadToken();
  }, []);

  async function login(email, password) {
    try {
      console.log("Logging in the user...");
      const resp = await loginAccount({ email_id: email, password });

      const token = resp.data.data.token;

      setUser({
        token,
        authenticated: true,
        authChecked: true,
      });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await SecureStore.setItemAsync("JWT_TOKEN", token);

      console.log("logged in:", resp.data.data);
      return resp.data;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync("JWT_TOKEN");
    api.defaults.headers.common["Authorization"] = "";

    setUser({
      token: null,
      authenticated: false,
      authChecked: true,
    });

    console.log("logged out");
  }

  async function register({ username, email_id, password }) {
    try {
      const resp = await registerAccount({ username, email_id, password });
      console.log(resp);
    } catch (error) {
      throw error;
    }
  }

  async function createUserProfile() {
    
  }

  async function forgotPassword() {
    
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        createUserProfile,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
