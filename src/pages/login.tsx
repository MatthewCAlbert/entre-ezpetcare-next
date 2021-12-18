import DefaultImage from '@/components/DefaultImage';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import LoadingScreen from '@/components/LoadingScreen';
import { theme } from '@/config/emotion';
import { route } from '@/config/route';
import AuthContext from '@/context/AuthContext'
import { getUnecryptedCookie } from '@/utils/cookie';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getDoc, doc } from '@firebase/firestore/lite';

const LoginPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const router = useRouter();
  const redirectPath = getUnecryptedCookie("auth-redirect");
  const toast = useToast();

  useEffect(()=>{
    if( auth.isAuthenticated() ){
      router.push("/");
    }
  }, [])

  const handleLogin = (data: any)=>{
    const {email, password} = data;

    // submit login
    if( !auth?.auth ) return;
    setLoading(true);

    signInWithEmailAndPassword(auth?.auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        toast({
          title: 'Login success.',
          status: 'success',
          duration: 2000,
        })
        const user = userCredential.user;
        let userData = {
          id: user.uid || "",
          name: user?.displayName || "User",
          email: user.email || "",
          phone: user?.phoneNumber || "",
        };
        try {
          if( auth?.firestore ){
            const userDetailDoc = await getDoc(doc(auth?.firestore, 'users', user.uid))
            userData = {...userData, name: userDetailDoc.get('name'), phone: userDetailDoc.get('phone') }
          }
        } catch (error) {
        }
        auth?.login({user: userData});
        if( redirectPath !== route.account.index )
          router.push(redirectPath || route.index);
        else
          router.push(route.index);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        toast({
          title: 'Login error.',
          status: 'error',
          duration: 2000,
        })
      })
      .finally(()=>{
        setLoading(false);
      })

  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <Layout>
      <SEO title="Login"/>
      <LoadingScreen show={loading}/>
      <section className="section mb-8">
          <div className="section-inner pt-4">
            <h1 className="text-2xl font-bold mb-4">Masuk</h1>
            <DefaultImage src="/assets/img/dog-walking.png" alt="Walking Dog" style={{width: "100%", height: "200px"}} objectFit="contain"/>

            <form onSubmit={handleSubmit(handleLogin)} className="w-full mt-5">
              <FormControl isInvalid={errors.username}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder='' className="mb-4" {...register("email", {required: true})} />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder='' className="mb-4" {...register("password", {required: true})} />
              </FormControl>

              <Button colorScheme="orange" type="submit" isFullWidth>MASUK</Button>
            </form>

            <div className="text-center mt-7">
              <p>Pengguna baru? <Link href={route.register}><a className="text-red-600 font-bold">Buat Akun</a></Link></p>
              <Link href="#"><a className="text-red-600 font-bold block mt-2 ">Lupa kata sandi?</a></Link>

              <div className="flex justify-center mt-7" css={css`
                & > .btn{
                  width: 60px;
                  height: 60px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: ${theme.primaryorange};
                  border-radius: 60px;
                  margin: 0 10px;
                  i{
                    color: ${theme.darkbrown};
                    font-size: 2rem;
                  }
                }
              `}>
                <button className="btn shadow-md"><i className="fab fa-facebook"></i></button>
                <button className="btn shadow-md"><i className="fab fa-twitter"></i></button>
                <button className="btn shadow-md"><i className="fab fa-google"></i></button>
              </div>
            </div>

          </div>
        </section>
    </Layout>
  )
}

export default LoginPage
