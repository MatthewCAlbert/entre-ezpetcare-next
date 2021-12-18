import { Reducer } from "react";

type AppointmentType = { id: string, date: Date }
type ItemType = { id: string, quantity: number }

export type CartState = {
  doctor: {
    merchantId?: string,
    items?: AppointmentType[]
  },
  grooming: {
    merchantId?: string,
    items?: AppointmentType[]
  },
  shop: {
    merchantId?: string,
    items?: ItemType[]
  }
}

export type CartReducer = Reducer<CartState, {type: string, payload: {
  type?: string,
  merchantId?: string,
  appointment?: AppointmentType,
  item?: ItemType
}}>

export const cartAction = {
  ADD: "ADD"
}

export const initialCartState: CartState = {
  doctor: {},
  grooming: {},
  shop: {}
}

const cartReducer: CartReducer = ( state, action )=>{
  const payload = action?.payload;

  switch( action.type ){
    case cartAction.ADD:
      const t = payload?.type;

      switch( t ){
        case "doctor":
          if( payload?.merchantId && payload?.appointment ){
            const prev = state?.doctor?.merchantId === payload?.merchantId && state.doctor.items ? state.doctor.items : [];
            return {
              ...state,
              doctor: {
                merchantId: payload?.merchantId,
                items: [...prev,  payload?.appointment]
              }
            } 
          }
        break;
        case "grooming":
          if( payload?.merchantId && payload?.appointment ){
            const prev = state?.grooming?.merchantId === payload?.merchantId && state.grooming.items ? state.grooming.items : [];
            return {
              ...state,
              grooming: {
                merchantId: payload?.merchantId,
                items: [...prev,  payload?.appointment]
              }
            } 
          }
        break;
        case "shop":
          if( payload?.merchantId && payload?.item ){
            const prev = state?.shop?.merchantId === payload?.merchantId && state.shop.items ? state.shop.items : [];
            return {
              ...state,
              shop: {
                merchantId: payload?.merchantId,
                items: [...prev,  payload?.item]
              }
            } 
          }
        break;
      }

      return state;
    break;
  }

  return state;
}

export default cartReducer;