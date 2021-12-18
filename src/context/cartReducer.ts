import { fakeDBTableName } from "@/data";
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

export type CartReducer = Reducer<CartState | any, {type: string, payload: {
  type?: fakeDBTableName,
  merchantId?: string,
  appointment?: AppointmentType,
  item?: ItemType,
  id?: string
}}>

export const cartAction = {
  ADD: "ADD",
  REPLACE: "REPLACE",
  REMOVE: "REMOVE",
  RESET: "RESET",
}

export const initialCartState: CartState = {
  doctor: {},
  grooming: {},
  shop: {}
}

const cartReducer: CartReducer = ( state, action )=>{
  const payload = action?.payload;
  const t = payload?.type;

  switch( action.type ){
    case cartAction.ADD:
      switch( t ){
        case fakeDBTableName.doctor:
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
        case fakeDBTableName.grooming:
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
        case fakeDBTableName.shop:
          if( payload?.merchantId && payload?.item ){
            const prev = state?.shop?.merchantId === payload?.merchantId && state.shop.items ? state.shop.items : [];
            let resItems = [...prev];
            const cItemId = resItems.findIndex(el=>el.id === payload?.item?.id);
            if( cItemId > -1 ){
              // resItems[cItemId].quantity += payload?.item?.quantity;
            }else{
              resItems.push(payload?.item);
            }
            return {
              ...state,
              shop: {
                merchantId: payload?.merchantId,
                items: resItems
              }
            } 
          }
        break;
      }
    break;

    case cartAction.REPLACE:
      return payload;
    break;

    case cartAction.REMOVE:
      switch( t ){
        case fakeDBTableName.doctor:
          if( payload?.id && state.doctor.items ){
            const resItems = state.doctor.items.filter((el: any)=> el?.id !== payload?.id);
            return {
              ...state,
              doctor: {
                ...state.doctor,
                items: resItems
              }
            } 
          }
        break;
        case fakeDBTableName.grooming:
          if( payload?.id && state.grooming.items ){
            const resItems = state.grooming.items.filter((el: any)=> el?.id !== payload?.id);
            return {
              ...state,
              grooming: {
                ...state.grooming,
                items: resItems
              }
            } 
          }
        break;
        case fakeDBTableName.shop:
          if( payload?.id && state.shop.items ){
            const resItems = state.shop.items.filter((el: any)=> el?.id !== payload?.id);
            return {
              ...state,
              shop: {
                ...state.shop,
                items: resItems
              }
            } 
          }
        break;
      }
    break;

    case cartAction.RESET:
      switch( t ){
        case fakeDBTableName.doctor:
          return {
            ...state,
            doctor: {
              ...state.doctor,
              items: []
            }
          } 
        break;
        case fakeDBTableName.grooming:
          return {
            ...state,
            grooming: {
              ...state.grooming,
              items: []
            }
          } 
        break;
        case fakeDBTableName.shop:
          return {
            ...state,
            shop: {
              ...state.shop,
              items: []
            }
          } 
        break;
      }
    break;
  }

  return state;
}

export default cartReducer;