import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import withAuth, { ReactProtectedPageInterface } from '@/hoc/withAuth'
import { Text } from '@chakra-ui/layout';
import { NextPage } from 'next'

const SchedulePage: NextPage<ReactProtectedPageInterface> = ({auth, router}) => {
  return (
    <>
      <SEO title="MyJadwal"/>
      <Header simpleBack={true} />
      <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={6}>MyJadwal</Text>
        </div>
      </section>
      </Layout>
    </>
  )
}

export default withAuth(SchedulePage, {title: "MyJadwal"});
