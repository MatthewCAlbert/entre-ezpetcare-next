import dayjs from "dayjs";
import { useEffect, useState } from "react";

const { default: AuthContext } = require("./AuthContext");

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

  const AUTH_USER_STORAGE = String(process.env.AUTH_USER_STORAGE);
  const AUTH_TOKEN_STORAGE = String(process.env.AUTH_TOKEN_STORAGE);

  const isExpired = ()=>{
    return token ? !dayjs(token.expires).subtract(1, 'm').isAfter(Date.now()) : false;
  }

  const isAuthenticated = () => {
    return loaded && token && !isExpired();
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
    token: TokenDataInterface,
    user: UserDataInterface
  })=>{
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(data.token) );
    localStorage.setItem(AUTH_USER_STORAGE, JSON.stringify(data.user) );
  }
  const logout = ()=>{
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_STORAGE);
    localStorage.removeItem(AUTH_USER_STORAGE);
  }

  const context = { user, token, isAuthenticated, login, logout, loaded, isExpired }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;