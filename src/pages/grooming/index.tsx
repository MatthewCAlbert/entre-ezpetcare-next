import type { NextPage } from 'next'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import DefaultImage from '@/components/DefaultImage'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import Header from '@/components/layout/Header'
import { Text } from '@chakra-ui/layout'

const GroomingIndexPage: NextPage = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <SEO title="Grooming"/>
      <Header simpleBack={true} />
      <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={6}>Grooming</Text>
        </div>
      </section>
      </Layout>
    </>
  )
  
}

export default GroomingIndexPage