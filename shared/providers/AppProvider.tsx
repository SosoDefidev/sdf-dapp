import React from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'

import { getPools, PoolType } from '@/api'

import { ERC20_ABI, POOL_ABI, RPC_URLS } from '../constants'
import useERC20 from '../hooks/useERC20'

const appContext = React.createContext<{
  account: string
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

  const [account, setAccount] = React.useState('')
  const [balance, setBalance] = React.useState('')

  const [pools, setPools] = React.useState<PoolType[]>([])
  const [sdfPrice] = React.useState<string>('1')
  const [totalSupply, setTotalSupply] = React.useState<string>('0')
  const [circulating, setCirculating] = React.useState<string>('0')
  const [maxSupply] = React.useState<string>('1000000000000000000000000000')
  const [currentPool, setCurrentPool] = React.useState<PoolType>({
    name: 'Seed Pool',
    icon: 'https://robohash.org/USD',
    address: '0xbebEc498e5Fa8b8356E106BDCce59622C4d08cdE',
    abi: POOL_ABI,
    supportTokens: [
      {
        name: 'USDT',
        icon: 'https://robohash.org/USDT',
        address: '0x2de8012e641802cc980bf85f5d1fc3364406ed3b',
        abi: ERC20_ABI,
        decimals: 18
      }
    ]
  })

  const [maxValue] = React.useState(
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  )
  const web3 = React.useRef<Web3>(new Web3(RPC_URLS['4']))

  const erc20 = useERC20('0x31Bd25Bd37341115a4aE0720d3Aae13E9f8C4358', account, web3.current)

  React.useEffect(() => {
    if (wallet.status === 'connected') {
      // init web3
      setAccount(wallet.account + '')
      setBalance(wallet.balance + '')
      web3.current = new Web3(wallet.ethereum)
    }
  }, [wallet])

  React.useEffect(() => {
    getPools().then((data) => {
      setPools(data)
    })
  }, [])

  React.useEffect(() => {
    erc20.totalSupply().then((data) => {
      setTotalSupply(data)
      setCirculating(data)
    })
  }, [erc20])

  return (
    <appContext.Provider
      value={{
        account,
        balance,
        currentPool,
        pools,
        maxValue,
        sdfPrice,
        web3: web3.current,
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
  const {
    balance,
    account,
    currentPool,
    pools,
    maxValue,
    web3,
    sdfPrice,
    totalSupply,
    circulating,
    maxSupply,
    tooglePool
  } = React.useContext(appContext)

  return {
    balance,
    account,
    currentPool,
    pools,
    maxValue,
    web3,
    sdfPrice,
    totalSupply,
    circulating,
    maxSupply,
    accountShort: account && account.slice(0, 6) + '...' + account.slice(-4),
    tooglePool
  }
}

export { AppProvider, useApp }
