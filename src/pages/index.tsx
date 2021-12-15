import type { NextPage } from 'next'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import DefaultImage from '@/components/DefaultImage'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'
import MainPageNav from '@/components/MainPageNav'

const IndexPage: NextPage = () => {
  const auth = useContext(AuthContext);

  return (
    <Layout>
      <SEO useJargon={true}/>
        <section className="section">
          <div className="section-inner pt-4">
            {
              auth?.isAuthenticated() ?
              <>
                <h1 className="text-2xl font-bold mb-2">Halo, {auth?.user?.name}</h1>
              </>
              :
              <>
                <h1 className="text-2xl font-bold mb-2">Selamat datang di EZPetCare</h1>
              </>
            }
            <p className="text-md mb-4">butuh kebutuhan hewan apa lagi hari ini?</p>
            <DefaultImage src="/assets/img/doctor-check.png" alt="Doctor Checking" style={{width: "100%", height: "250px"}} objectFit="contain"/>
          </div>
        </section>
        <section className="section">
          <div className="section-inner">
            <MainPageNav/>
          </div>
        </section>
    </Layout>
  )
  
}

export default IndexPage