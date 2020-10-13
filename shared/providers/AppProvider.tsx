import React from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'

import USDTSVG from '@/icons/USDT.svg'

import { ERC20_ABI, POOL_ABI, RPC_URLS } from '../constants'
import useCache from '../hooks/useCache'
import useERC20 from '../hooks/useERC20'
import { useLanguage } from './LanguageProvider'

export type ContractType = {
  address: string
  abi: any[]
}

export type TokenType = {
  name: string
  icon: string
  decimals: number
} & ContractType

export type PoolType = {
  name: string
  icon: string
  supportTokens: TokenType[]
} & ContractType

const appContext = React.createContext<{
  account?: string
  balance: string
  currentPool: PoolType
  pools: PoolType[]
  sdfPrice: string
  maxValue: string
  web3: Web3
  totalSupply: string
  circulating: string
  maxSupply: string
  tooglePool(pool: PoolType): void
}>({} as any)

const AppProvider: React.FunctionComponent = ({ children }) => {
  const wallet = useWallet<any>()
  const { lang } = useLanguage()

  const [account, setAccount] = useCache<string>('account')
  const [balance, setBalance] = React.useState('')
  const web3 = React.useMemo(() => {
    if (wallet.ethereum) {
      return new Web3(wallet.ethereum)
    } else {
      return new Web3(RPC_URLS[wallet.chainId + ''])
    }
  }, [wallet])
  const erc20 = useERC20('0x62bfcc7748f7c1d660eb9537C8af778D8BEb2B14', account + '', web3)

  const [pools] = React.useState<PoolType[]>([
    {
      name: lang === 'zh-CN' ? '稳定币池' : 'Seed Pool',
      icon: '/imgs/USD.svg',
      address: '0x6bF5A42eCa19B0d47B7e3C66928EFd2cAB461C8C',
      abi: POOL_ABI,
      supportTokens: [
        {
          name: 'USDT',
          icon: '/imgs/USDT.svg',
          address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
          abi: ERC20_ABI,
          decimals: 6
        },
        {
          name: 'USDC',
          icon: 'https://robohash.org/USDC',
          address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          abi: ERC20_ABI,
          decimals: 6
        },
        {
          name: 'TUSD',
          icon: 'https://robohash.org/TUSD',
          address: '0x0000000000085d4780B73119b644AE5ecd22b376',
          abi: ERC20_ABI,
          decimals: 18
        },
        {
          name: 'DAI',
          icon: 'https://robohash.org/DAI',
          address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          abi: ERC20_ABI,
          decimals: 18
        }
      ]
    }
  ])
  const [sdfPrice] = React.useState<string>('1')
  const [totalSupply, setTotalSupply] = React.useState<string>('0')
  const [circulating, setCirculating] = React.useState<string>('0')
  const [maxSupply] = React.useState<string>('1000000000000000000000000000')

  const [currentPool, setCurrentPool] = React.useState<PoolType>(pools[0])

  React.useEffect(() => {
    if (wallet.ethereum) {
      wallet.account && setAccount(wallet.account)
      setBalance(wallet.balance + '')
    } else {
      setAccount('')
      setBalance('')
    }
  }, [wallet])

  React.useEffect(() => {
    erc20.totalSupply().then((data) => {
      setTotalSupply(data)
      setCirculating(data)
    })
  }, [erc20])

  React.useEffect(() => {
    if (account) {
      wallet.connect('injected')
    }
  }, [])

  return (
    <appContext.Provider
      value={{
        account,
        balance,
        currentPool,
        pools,
        maxValue: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        sdfPrice,
        web3,
        totalSupply,
        circulating,
        maxSupply,
        tooglePool: (pool) => setCurrentPool(pool)
      }}>
      {children}
    </appContext.Provider>
  )
}

const useApp = () => {
  const context = React.useContext(appContext)

  return context
}

export { AppProvider, useApp }
