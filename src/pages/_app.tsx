import type { AppProps } from 'next/app'
import Head from "next/head";
import '../styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
          <Head>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel="shortcut icon" href="/assets/img/favicon.png" />
          <link rel="manifest" href="/manifest.json"/>
          <meta property="og:locale" content="id_ID"/>
        </Head>
        <div id="root">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp