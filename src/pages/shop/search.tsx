import type { NextPage } from 'next'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import { Text, StackDivider } from '@chakra-ui/layout'
import SearchSection from '@/components/SearchSection'
import { fakeDb, fakeDBTableName } from '@/data'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import useSearch from '@/hooks/useSearch'
import { route } from '@/config/route'
import SearchItem from '@/components/SearchItem'
import useOrder from '@/hooks/useOrder'
import { cartAction } from '@/context/cartReducer'
import { css } from '@emotion/react'
import { cssVariables, theme } from '@/config/emotion'
import Link from 'next/link'

const ShopSearch: NextPage = () => {
  const { cartState, cartDispatch } = useOrder();
  const { searchInput } = useSearch(fakeDBTableName.shop, route.shop.search);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(()=>{
    const res = fakeDb.filterItemByName(fakeDBTableName.shop, searchInput);
    setSearchResult(res);
  }, [searchInput])

  const addToCart = (merchantId: string, itemId: string, qty = 1)=>{
    cartDispatch({
      type: cartAction.ADD,
      payload: {
        type: fakeDBTableName.shop,
        item: {
          id: itemId,
          quantity: qty
        },
        merchantId,
      }
    })
  }

  return (
    <>
      <SEO title="Shop Search"/>
      <Header simpleBack={true} />
      <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Breadcrumb marginBottom={6} separator={<i className='fas fa-chevron-right text-gray-400'></i>}>
            <BreadcrumbItem>
              <BreadcrumbLink href={route.shop.index}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.400">Shop</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Text fontSize="2xl" fontWeight="bold">Search</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          
          <SearchSection type={fakeDBTableName.shop} targetUrl={route.shop.search}/>
          
          <StackDivider height={3}/>

          {/* Search Result */}
          <div className="flex flex-col gap-2" css={css`
            margin-bottom: 120px;
          `}>
          {
            searchResult.map((el, id)=>(
              <SearchItem key={id} name={el.name} merchantName={el.merchantName} price={el.price} onAdd={()=>addToCart(String(el?.merchantId), el?.id)}/>
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
              <Text fontWeight={800}>{ cartState.shop?.items?.length || 0 } Items</Text>
              <Text fontSize="sm">{ fakeDb.filterMerchantById(fakeDBTableName.shop, String(cartState.shop?.merchantId))?.name }</Text>
            </div>
          </div>
          <div>
            <Link passHref href={route.shop.checkout}>
              <Button color="white" colorScheme="orange" backgroundColor={theme.darkbrown}><i className="fas fa-chevron-right"></i></Button>
            </Link>
          </div>
        </div>
      </section>
      </Layout>
    </>
  )
  
}

export default ShopSearch