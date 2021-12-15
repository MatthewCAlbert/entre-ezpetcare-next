import Header from '@/components/layout/Header'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/layout/SEO'
import { route } from '@/config/route'
import withAuth, { ReactProtectedPageInterface } from '@/hoc/withAuth'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Divider, Text } from '@chakra-ui/layout'
import { NextPage } from 'next'

const AccountPage: NextPage<ReactProtectedPageInterface> = ({auth, router}) => {
  
  const onLogout = ()=>{
    auth?.logout();
    router?.push(route.index);
  }

  return (
    <>
    <Header simpleBack={true}/>
    <SEO title="Akun Saya"/>
    <Layout enableHeader={false}>
      <section className="section">
        <div className="section-inner">
          <Text fontSize="2xl" fontWeight="bold" marginBottom={6}>Akun Saya</Text>

          <div className="flex justify-between">
            <Avatar size="xl" name={auth?.user?.name || "User"}/>
            <div className="grow ml-5">
              <Text>Welcome Back!</Text>
              <Text fontSize="2xl" fontWeight="bold">{auth?.user?.name}</Text>
              <Text>{auth?.user?.phone}</Text>
            </div>
          </div>

          <Divider className="my-3"/>

          <Text fontSize="xl" fontWeight="bold" marginBottom={2}>Menu</Text>

          <Button color="white" backgroundColor="orange.400" colorScheme="orange" marginBottom={2} isFullWidth>Ganti Password</Button>
          <Button color="white" backgroundColor="orange.400" colorScheme="orange" marginBottom={2} isFullWidth>Pilih Bahasa (Indonesia)</Button>
          <Button color="white" backgroundColor="orange.400" colorScheme="orange" marginBottom={2} isFullWidth>Bantuan</Button>
          <Button color="white" backgroundColor="orange.400" colorScheme="orange" marginBottom={2} isFullWidth>Tentang</Button>
          <Button color="white" backgroundColor="orange.400" colorScheme="orange" marginBottom={2} isFullWidth onClick={onLogout}>Keluar</Button>
        </div>
      </section>
    </Layout>
    </>
  )
}

export default withAuth(AccountPage, {title: "Account"})
