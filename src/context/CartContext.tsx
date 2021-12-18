import { createContext, Dispatch } from "react";
import { CartState, initialCartState } from "./cartReducer";

export interface CartContextInterface{
  state: CartState,
  dispatch: Dispatch<{type: string, payload: any}>
}

const cartInitialContext: CartContextInterface = {
  state: initialCartState,
  dispatch: () => { throw new Error('No provider') },
}

const CartContext = createContext(cartInitialContext);

export default CartContext;