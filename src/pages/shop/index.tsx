import type { NextPage } from 'next'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Header from '@/components/layout/Header'
import { Text, StackDivider } from '@chakra-ui/layout'
import SearchSection from '@/components/SearchSection'
import { fakeDBTableName } from '@/data'
import { Button } from '@chakra-ui/react'
import { theme } from '@/config/emotion'
import useSearch from '@/hooks/useSearch'
import { route } from '@/config/route'

const ShopIndexPage: NextPage = () => {
  const auth = useContext(AuthContext);
  const {directSearch} = useSearch(fakeDBTableName.shop, route.shop.search);

  const recommendationSearch = [
    "Makanan",
    "Makanan Hewan", "Kandang Hewan Peliharaan", "Shampoo Hewan"
  ]

  return (
    <>
      <SEO title="Shop"/>
      <Header simpleBack={true} />
      <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={6}>Shop</Text>
          <SearchSection type={fakeDBTableName.shop} targetUrl={route.shop.search}/>
          
          <StackDivider height={3}/>

          <div className="flex flex-wrap gap-2">
          {
            recommendationSearch && recommendationSearch.map((el,id)=>(
              <Button backgroundColor="orange.200" colorScheme="orange" color={theme.darkbrown} key={id} onClick={()=>directSearch(el)}>
                {el}
              </Button>
            ))
          }
          </div>

          <StackDivider height={3}/>
          
          <Text fontSize="sm" fontWeight="light" marginBottom={2}>tidak menemukan apa yang anda cari?</Text>
          <Button color="white" backgroundColor="orange.400" colorScheme="orange" marginBottom={2} fontWeight={700} isFullWidth >TAMBAHKAN SARAN BENDA</Button>
        </div>
      </section>
      </Layout>
    </>
  )
  
}

export default ShopIndexPage