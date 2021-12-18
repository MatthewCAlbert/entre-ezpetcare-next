import { createContext, Dispatch } from "react";
import { CartState, initialCartState } from "./cartReducer";

export interface CartContextInterface{
  state: CartState,
  dispatch: Dispatch<{type: string, payload: any}>
}

const cartIntialContext: CartContextInterface = {
  state: initialCartState,
  dispatch: () => { throw new Error('No provider') },
}

const CartContext = createContext(cartIntialContext);

export default CartContext;