import { ERC20_ABI, POOL_ABI } from './shared/constants'

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

export const getPools = async () => {
  const pools: PoolType[] = [
    {
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
    }
  ]
  return pools
}
