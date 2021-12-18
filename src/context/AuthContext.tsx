import { Auth } from "firebase/auth";
import { createContext } from "react";
import { TokenDataInterface, UserDataInterface } from "./AuthProvider";
import { Firestore } from '@firebase/firestore/lite';

export interface AuthContextInterface{
  auth: Auth | null,
  firestore: Firestore | null,
  user: UserDataInterface | null,
  token: TokenDataInterface | null,
  loaded: boolean,
  login: {(data: {
    user: UserDataInterface
  }):void},
  logout: {():void},
  isExpired: {():boolean},
  isAuthenticated: {():boolean},
}

const intialContext: AuthContextInterface = {
  auth: null,
  firestore: null,
  user: null,
  token: null,
  loaded: false,
  login: (data: Object) => { throw new Error('No provider') },
  logout: () => { throw new Error('No provider') },
  isExpired: () => { throw new Error('No provider') },
  isAuthenticated: () : boolean => { throw new Error('No provider') }
}

const AuthContext = createContext(intialContext);

export default AuthContext;