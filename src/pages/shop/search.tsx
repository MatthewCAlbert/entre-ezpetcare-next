import type { NextPage } from 'next'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '@/context/AuthContext'
import Header from '@/components/layout/Header'
import { Text, StackDivider } from '@chakra-ui/layout'
import SearchSection from '@/components/SearchSection'
import { fakeDb, fakeDBTableName } from '@/data'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from '@chakra-ui/react'
import useSearch from '@/hooks/useSearch'
import { route } from '@/config/route'
import SearchItem from '@/components/SearchItem'

const ShopSearch: NextPage = () => {
  const { searchInput } = useSearch(fakeDBTableName.shop, route.shop.search);
  const [searchResult, setSearchResult] = useState(fakeDb.filterItemByName(fakeDBTableName.shop, ""));

  const recommendationSearch = [
    "Makanan Hewan", "Kandang Hewan Peliharaan", "Shampoo Hewan"
  ]

  useEffect(()=>{
    const res = fakeDb.filterItemByName(fakeDBTableName.shop, searchInput);
    setSearchResult(res);
  }, [searchInput])

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
          {
            searchResult.map((el, id)=>(
              <SearchItem key={id} name={el.name} merchantName={el.merchantName} price={el.price}/>
            ))
          }

        </div>
      </section>
      </Layout>
    </>
  )
  
}

export default ShopSearch