import Layout from '@/components/layout/Layout'
import Link from 'next/link'

const Page404 = () => {
  return (
    <Layout>
      <section className="section h-full items-center mb-20">
        <div className="section-inner text-center">
          <h1 className="font-bold text-5xl">404</h1>
          <p className="font-semibold text-xl mb-4">Not Found</p>
          <Link href="/">Kembali ke Beranda</Link>
        </div>
      </section>
    </Layout>
  )
}

export default Page404
