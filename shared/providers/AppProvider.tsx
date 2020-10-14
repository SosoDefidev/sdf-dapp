import { ChainId, Fetcher, Route, Token } from '@uniswap/sdk'
import BigNumber from 'bignumber.js'
import React from 'react'
import { useAsync, useInterval } from 'react-use'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'

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
  totalReward: string
  hourRatio: number
  totalLocked: string
  rewardPerBlock: string
} & ContractType

const appContext = React.createContext<{
  account?: string
  balance: string
  currentPool?: PoolType
  pools: PoolType[]
  sdfPrice: string
  maxValue: string
  web3: Web3
  currentSupply: string
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

  const { value: sdfPrice = '0.1' } = useAsync(async () => {
    const SDF = new Token(ChainId.MAINNET, '0x62bfcc7748f7c1d660eb9537C8af778D8BEb2B14', 18)
    const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6)
    const pair = await Fetcher.fetchPairData(SDF, USDT)

    const route = new Route([pair], USDT)
    return route.midPrice.invert().toSignificant()
  }, [])

  const { value: pools = [] } = useAsync(async () => {
    const pools: PoolType[] = [
      {
        name: lang === 'zh-CN' ? '稳定币池' : 'Seed Pool',
        icon: '/imgs/USD.svg',
        address: '0x6bF5A42eCa19B0d47B7e3C66928EFd2cAB461C8C',
        abi: POOL_ABI,
        totalReward: new BigNumber('345600')
          .multipliedBy(new BigNumber('300000000000000000'))
          .toString(),
        hourRatio: 0,
        totalLocked: '0',
        rewardPerBlock: '300000000000000000',
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
    ]

    const weiTotalSupplys = await Promise.all(
      pools.map((pool) => {
        const contract = new web3.eth.Contract(POOL_ABI, pool.address)
        return contract.methods.weiTotalSupply().call()
      })
    )

    return weiTotalSupplys.map((wei, index) => ({
      ...pools[index],
      hourRatio: (0.3 / Number(web3.utils.fromWei(wei))) * 4 * 60 * Number(sdfPrice) * 100,
      totalLocked: wei
    }))
  }, [sdfPrice, web3])

  const [circulating, setCirculating] = React.useState<string>('0')
  const currentSupply = React.useMemo(() => {
    if (pools.length === 0) {
      return '0'
    }

    return new BigNumber(
      pools
        .map((pool) => pool.totalReward)
        .reduce((l, r) => new BigNumber(l).plus(new BigNumber(r)).toString())
    ).toFixed(0)
  }, [pools.map((pool) => pool.totalReward).join(';')])
  const [maxSupply] = React.useState<string>('1000000000000000000000000000')

  const [currentPool, setCurrentPool] = React.useState<PoolType | undefined>(pools?.[0])

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
        currentSupply,
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
