import { firebaseConfig } from "@/config/firebase";
import dayjs from "dayjs";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getFirestore } from '@firebase/firestore/lite';

export interface UserDataInterface{
  active?: number,
  email?: string,
  phone?: string,
  username?: string,
  name?: string,
  role?: string,
  uid?: string,
  id?: string,
}

export interface TokenDataInterface{
  expires: string,
  token: string
}

const AuthProvider: React.FC = ({children})=>{
  const [user, setUser] = useState<UserDataInterface | null>(null);
  const [token, setToken] = useState<TokenDataInterface | null>(null);
  const [loaded, setLoaded] = useState(false);
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const AUTH_USER_STORAGE = String(process.env.AUTH_USER_STORAGE);
  const AUTH_TOKEN_STORAGE = String(process.env.AUTH_TOKEN_STORAGE);

  const isExpired = ()=>{
    return token ? !dayjs(token.expires).subtract(1, 'm').isAfter(Date.now()) : false;
  }

  const isAuthenticated = () => {
    return auth.currentUser ? true : false;
  }

  useEffect(() => {
    const userStorage = localStorage.getItem(AUTH_USER_STORAGE);
    const tokenStorage = localStorage.getItem(AUTH_TOKEN_STORAGE);
    if (userStorage && tokenStorage) {
      const userData = JSON.parse(userStorage);
      setUser(userData);
      setToken(JSON.parse(tokenStorage));
    }
    setLoaded(true);
  }, [])

  const login = (data: {
    user: UserDataInterface
  })=>{
    setUser(data.user);
    localStorage.setItem(AUTH_USER_STORAGE, JSON.stringify(data.user) );
  }
  const logout = ()=>{
    setUser(null);
    localStorage.removeItem(AUTH_USER_STORAGE);
    auth.signOut();
  }

  const context = { auth, firestore, user, token, isAuthenticated, login, logout, loaded, isExpired }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;