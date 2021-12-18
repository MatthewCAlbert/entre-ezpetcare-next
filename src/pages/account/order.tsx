import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import SearchSection from '@/components/SearchSection';
import { fakeDb, fakeDBTableName } from '@/data';
import withAuth, { ReactProtectedPageInterface } from '@/hoc/withAuth'
import useOrder from '@/hooks/useOrder';
import { Text, StackDivider } from '@chakra-ui/layout';
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import {formatNumber} from "@/utils/utils";
import { css } from '@emotion/react';

const countSumPrice = (x: any[])=>{
  let res = 0;
  x.forEach((el)=>res+=el?.value);
  return res;
}

const OrderPage: NextPage<ReactProtectedPageInterface> = ({auth, router}) => {
  const order = useOrder();
  const [myOrders, setMyOrders] = useState<{
    id: string,
    created_at: {
      seconds: number
    },
    items: {
      id: string,
      quantity: number,
      value: number,
      itemDetail: {
        id: string, 
        name: string,
        description: string,
        price: number
      }
    }[],
    merchantId: string,
    type: fakeDBTableName,
    userRef: any
  }[]>([]);

  useEffect(()=>{
    const res: any = [];
    order.getOrders().then(ors=>{
      
      ors?.forEach(el=>{
        res.push({...el.data(), id: el.id});
      })
      setMyOrders(res);

    })

  }, [])

  return (
    <>
      <SEO title="Pesanan Saya"/>
      <Header simpleBack={true} />
      <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={6}>Pesanan Saya</Text>
          <SearchSection/>
          
          <StackDivider height={3}/>
          
          <div className="flex flex-col gap-2" css={css`
            margin-bottom: 120px;
          `}>
            {
              myOrders.length > 0 ? myOrders.map((el)=>(
                <div key={el.id} className='rounded-lg bg-orange-200 px-4 py-3'>
                  <Text fontSize="sm" color="gray.600">ID #{el.id}</Text>
                  <Text>{fakeDb.findMerchantById(el.type, el.merchantId)?.name}</Text>
                  <Text fontWeight={700}>Rp. {formatNumber(countSumPrice(el?.items))},-</Text>
                </div>
              ))
              :
              <p>Belum tersedia pesanan apapun..</p>
            }
          </div>


        </div>
      </section>
      </Layout>
    </>
  )
}

export default withAuth(OrderPage, {title: "Pesanan Saya"});
