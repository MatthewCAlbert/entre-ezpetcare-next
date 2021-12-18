import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import Header from '@/components/layout/Header'
import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();
  const {q} = router.query;

  return (
    <>
      <Header forceSearchOpen={true}/>
      <SEO title={`Mencari "${q}"`}/>
      <Layout enableHeader={false}>
          <section className="section">
            <div className="section-inner pt-4">
            </div>
          </section>
      </Layout>
    </>
  )
}

export default SearchPage
