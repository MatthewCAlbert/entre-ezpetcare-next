import Header from "@/components/layout/Header"
import Layout from "@/components/layout/Layout"
import SEO from "@/components/layout/SEO"
import { cssVariables, theme } from "@/config/emotion"
import { route } from "@/config/route"
import { cartAction } from "@/context/cartReducer"
import { fakeDb, fakeDBTableName } from "@/data"
import withAuth, { ReactProtectedPageInterface } from "@/hoc/withAuth"
import useOrder from "@/hooks/useOrder"
import { formatNumber } from "@/utils/utils"
import { Button, Text } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { NextPage } from "next"
import { useEffect, useState } from "react"

const ShopCheckoutPage: NextPage<ReactProtectedPageInterface> = ({router}) => {
  const { cartState, cartDispatch, checkout } = useOrder();

  const [cartDetails, setCartDetails] = useState<any[]>([]);
  const [merchantDetails, setMerchantDetails] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(()=>{
    const items = cartState?.shop?.items;
    const res: any = []
    if( items ){
      let tPrice = 0;
      items.forEach((el)=>{
        const itemDetail = fakeDb.findItemById(fakeDBTableName.shop, el?.id);
        res.push({ ...el, itemDetail });
        tPrice += (itemDetail?.price || 0) * el?.quantity;
      })
      setTotalPrice(tPrice);
      setCartDetails(res);
      if( res?.[0]?.itemDetail?.merchantId ){
        const md = fakeDb.filterMerchantById(fakeDBTableName.shop, res?.[0]?.itemDetail?.merchantId);
        setMerchantDetails(md);
      }
    }

  }, [cartState?.shop?.items])

  const onCheckout = ()=>{
    checkout(fakeDBTableName.shop);
    router?.push(route.account.order);
  }

  const removeItem = (id: string)=>{
    cartDispatch({
      type: cartAction.REMOVE,
      payload: {
        type: fakeDBTableName.shop,
        id
      }
    })
  }

  return (
    <>
      <SEO title="Shop Checkout"/>
      <Header simpleBack={true} />
      <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={6}>Shop Checkout</Text>

          <div className="mb-4">
            {
              cartDetails?.length > 0 ? (
                <>
                <Text fontWeight={700}>{merchantDetails?.name}</Text>
                <Text>{merchantDetails?.address}</Text>
                </>
              )
              :
              <Text>Ups, belum ada barang belanjaan nih...</Text>
            }
          </div>

          <div className="flex flex-col gap-2" css={css`
            margin-bottom: 120px;
          `}>
            {
              cartDetails?.map((el,id)=>(
                <div key={id} className="flex w-full justify-between">
                  <div className="flex items-center">
                    <div>
                      <i className="fas fa-times text-2xl mr-7 cursor-pointer" onClick={()=>removeItem(el?.id)}></i>
                    </div>
                    <div className="flex gap-2">
                      <Text fontWeight={700}>{el?.quantity}x</Text>
                      <span>{el?.itemDetail?.name}</span>
                    </div>
                  </div>
                  <div>
                    <Text fontWeight={500}>Rp. {formatNumber(el?.itemDetail?.price)}</Text>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
      </section>
      <section css={css`
        width: 100%;
        position: fixed;
        max-width: ${cssVariables.maxWidth};
        bottom: ${cssVariables.navHeight};
      `}>
        <div className="flex justify-between items-center rounded-t-xl bg-slate-200 shadow-sm w-full px-5 py-4 pb-6">
          <div className='flex items-center gap-4' css={css`
            color: ${theme.darkbrown};
          `}>
            <div>
              <i className="fas fa-shopping-cart fa-2x"></i>
            </div>
            <div>
              <Text fontWeight={800}>Rp. { formatNumber(totalPrice) },-</Text>
            </div>
          </div>
          <div>
            {
              cartDetails?.length > 0 && <Button color="white" colorScheme="orange" backgroundColor={theme.darkbrown} onClick={onCheckout}><i className="fas fa-chevron-right"></i></Button>
            }
          </div>
        </div>
      </section>
      </Layout>
    </>
  )
}

export default withAuth(ShopCheckoutPage, { title: "Shop Checkout" })
