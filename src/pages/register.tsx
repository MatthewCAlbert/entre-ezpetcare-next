import Layout from '@/components/layout/Layout';
import SEO from '@/components/layout/SEO';
import LoadingScreen from '@/components/LoadingScreen';
import { theme } from '@/config/emotion';
import { route } from '@/config/route';
import AuthContext from '@/context/AuthContext'
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addDoc, collection } from '@firebase/firestore/lite';
import { getUnecryptedCookie } from '@/utils/cookie';

const RegisterPage: NextPage = () => {
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

  const handleRegister = (data: any)=>{
    const {email, password, name, phone} = data;
    if( !auth?.auth ) return;
    setLoading(true);

    createUserWithEmailAndPassword(auth?.auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        toast({
          title: 'Register success.',
          status: 'success',
          duration: 2000,
        })
        const user = userCredential.user;
        try {
          if( auth?.firestore ){
            const docRef = await addDoc(collection(auth?.firestore, 'users'), {
              uid: user.uid, name, phone
            });
          }
        } catch (error) {
        }

        const userData = {
          id: user.uid || "",
          name: name,
          email: user.email || "",
          phone: phone,
        };
        
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
          title: 'Register error.',
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
    watch,
    formState: { errors }
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <Layout>
      <SEO title="Register"/>
      <LoadingScreen show={loading}/>
      <section className="section mb-8">
          <div className="section-inner pt-4">
            <h1 className="text-2xl font-bold mb-4">Registrasi</h1>

            <form onSubmit={handleSubmit(handleRegister)} className="w-full mt-5">
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder='' className="mb-4" {...register("email", {required: true})} />
              </FormControl>

              <FormControl isInvalid={errors.name}>
                <FormLabel>Nama Lengkap</FormLabel>
                <Input type="text" placeholder='' className="mb-4" {...register("name", {required: true})} />
              </FormControl>

              <FormControl isInvalid={errors.phone}>
                <FormLabel>Nomor Telepon</FormLabel>
                <Input type="text" placeholder='' className="mb-4" {...register("phone")} />
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder='' className="mb-4" {...register("password", {required: true, minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                }})} />
              </FormControl>

              <FormControl isInvalid={errors.repassword}>
                <FormLabel>Konfirmasi Password</FormLabel>
                <Input type="password" placeholder='' className="mb-4" {...register("repassword", {required: true, 
                validate: value =>
                  value === password.current || "The passwords do not match" 
                })} />
              </FormControl>

              <Button colorScheme="orange" type="submit" isFullWidth>DAFTAR</Button>
            </form>

            <div className="text-center mt-7">
              <p>Pengguna lama? <Link href={route.login}><a className="text-red-600 font-bold">Masuk</a></Link></p>

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

export default RegisterPage
