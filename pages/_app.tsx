import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { UseWalletProvider } from 'use-wallet'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { ViewportProvider } from '@/shared/providers/ViewportProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      chainId={process.env.NODE_ENV === 'production' ? 1 : 4}
      connectors={{
        walletconnect: {
          rpcUrl:
            process.env.NODE_ENV === 'production'
              ? 'https://mainnet.eth.aragon.network'
              : 'https://rinkeby.eth.aragon.network/'
        }
      }}>
      <ViewportProvider>
        <Head>
          <title>SDF Farm</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta httpEquiv="pragma" content="no-cache" />
          <meta httpEquiv="Cache-Control" content="no-cache, must-revalidate" />
          <meta httpEquiv="expires" content="0" />
        </Head>
        <Header />
        <Hero />
        <Component {...pageProps} />
        <Footer />
      </ViewportProvider>
    </UseWalletProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
