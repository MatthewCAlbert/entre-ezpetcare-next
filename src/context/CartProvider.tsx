import { getUnecryptedCookie, setUnecryptedCookie } from "@/utils/cookie";
import { useEffect, useReducer, useState } from "react";
import CartContext from "./CartContext";
import cartReducer, { cartAction, CartReducer, initialCartState } from "./cartReducer";

const CartProvider: React.FC = ({children})=>{
  const [state, dispatch] = useReducer<CartReducer>(cartReducer, initialCartState);
  const STORAGE_ITEM_KEY = "ezpetcare-cart";

  useEffect(()=>{
    try {
      const items = JSON.parse(String(getUnecryptedCookie(STORAGE_ITEM_KEY)));
      if( items )
        dispatch({
          type: cartAction.REPLACE,
          payload: items
        });
    } catch (error) {
      
    }
  }, [])

  useEffect(()=>{
    setUnecryptedCookie(STORAGE_ITEM_KEY, JSON.stringify(state), {
      expires: 5 * 24 * 60 * 60
    })
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;