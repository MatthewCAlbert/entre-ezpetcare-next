import type { AppProps } from 'next/app'
import Head from "next/head";
import '../styles/globals.scss';
import 'react-calendar/dist/Calendar.css';
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from "../context/AuthProvider";
import CartProvider from '@/context/CartProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="shortcut icon" href="/assets/img/favicon.png" />
        <link rel="manifest" href="/manifest.json"/>
        <meta property="og:locale" content="id_ID"/>
      </Head>
      <div id="root">
        <AuthProvider>
          <CartProvider>
              <Component {...pageProps} />
          </CartProvider>
        </AuthProvider>
      </div>
    </ChakraProvider>
  )
}

export default MyApp