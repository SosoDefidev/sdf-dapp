import App, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { UseWalletProvider } from 'use-wallet'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { RPC_URLS } from '@/shared/constants'
import { AppProvider } from '@/shared/providers/AppProvider'
import { PoolProvider } from '@/shared/providers/PoolProvider'
import { ViewportProvider } from '@/shared/providers/ViewportProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UseWalletProvider
      chainId={1}
      connectors={{
        walletconnect: {
          rpcUrl: RPC_URLS['1']
        }
      }}>
      <AppProvider>
        <PoolProvider>
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
        </PoolProvider>
      </AppProvider>
    </UseWalletProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default MyApp
