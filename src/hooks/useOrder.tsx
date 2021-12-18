import AuthContext from '@/context/AuthContext';
import CartContext from '@/context/CartContext';
import { cartAction } from '@/context/cartReducer';
import { fakeDb, fakeDBTableName } from '@/data';
import { useToast } from '@chakra-ui/react';
import { addDoc, collection, Timestamp, getDocs, doc, query, where } from '@firebase/firestore/lite';
import { useContext } from 'react';

const useOrder = ()=>{
  const {user, firestore} = useContext(AuthContext);
  const {state: cartState, dispatch: cartDispatch} = useContext(CartContext);
  const toast = useToast();

  const checkout = async (type: fakeDBTableName)=>{
    if( firestore && user?.id )
    try {
      // Proccess Items
      let items: any;
      switch (type) {
        case fakeDBTableName.doctor: items = cartState.doctor?.items; break;
        case fakeDBTableName.grooming: items = cartState.grooming?.items; break;
        case fakeDBTableName.shop: items = cartState.shop?.items; break;
      }
      const res: any[] = [];
      let merchantId = "";
      items.forEach((el: any)=>{
        const itemDetail = fakeDb.findItemById(fakeDBTableName.shop, el?.id);
        merchantId = itemDetail?.merchantId || "";
        const savedDetail = {
          id: itemDetail?.id,
          name: itemDetail?.name,
          price: itemDetail?.price,
          description: itemDetail?.description
        }
        if( type === fakeDBTableName.shop ){
          res.push({ ...el, value: (itemDetail?.price || 0) * el?.quantity, itemDetail: savedDetail });
        }else{
          res.push({ ...el, value: itemDetail?.price, itemDetail: savedDetail });
        }
      })

      // Send to server
      const userRef = doc(firestore, 'users', user?.id);
      const docRef = await addDoc(collection(firestore, 'orders'), {
        userRef: userRef, 
        type: type,
        merchantId,
        items: res,
        created_at: Timestamp.now()
      });

      // Get order id and clear cart
      const orderId = docRef.id;
      cartDispatch({
        type: cartAction.RESET,
        payload: {
          type: type
        }
      });

      toast({
        title: 'Order success.',
        status: 'success',
        duration: 2000,
      })

    } catch (error) {
      console.log(error)

      toast({
        title: 'Order error.',
        status: 'error',
        duration: 2000,
      })
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

  return { cartState, cartDispatch, checkout, getOrders };
}

export default useOrder;