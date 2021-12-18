import { useEffect, useReducer, useState } from "react";
import CartContext from "./CartContext";
import cartReducer, { CartReducer, initialCartState } from "./cartReducer";

const CartProvider: React.FC = ({children})=>{
  const [state, dispatch] = useReducer<CartReducer>(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;