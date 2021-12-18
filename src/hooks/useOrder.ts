import AuthContext from '@/context/AuthContext';
import CartContext from '@/context/CartContext';
import { addDoc, collection, Timestamp, getDocs, doc, query, where } from '@firebase/firestore/lite';
import { useContext } from 'react';

const useOrder = ()=>{
  const {user, firestore} = useContext(AuthContext);
  const {state: cartState, dispatch: cartDispatch} = useContext(CartContext);

  const checkout = async ()=>{
    if( firestore && user?.id )
    try {
      const userRef = doc(firestore, 'users', user?.id);
      const docRef = await addDoc(collection(firestore, 'orders'), {
        userRef: userRef, 
        type: "",
        created_at: Timestamp.now()
      });
    } catch (error) {
    }
  }

  const getOrders = async ()=>{
    if( firestore && user?.id )
    try {
      const userRef = doc(firestore, 'users', user?.id);
      const q = query(collection(firestore, 'orders'), where('userRef', '==', userRef));
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (error) {
      return null;
    }
  }

  const getOrderItems = async (id: string)=>{
    if( firestore )
    try {
      const orderRef = doc(firestore, 'orders', id);
      const q = query(collection(firestore, 'order_items'), where('orderRef', '==', orderRef));
      const querySnapshot = await getDocs(q);
      return querySnapshot;
    } catch (error) {
      return null;
    }
  }

  return { checkout, getOrders, getOrderItems };
}

export default useOrder;