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
      address: '0x6bF5A42eCa19B0d47B7e3C66928EFd2cAB461C8C',
      abi: POOL_ABI,
      supportTokens: [
        {
          name: 'USDT',
          icon: 'https://robohash.org/USDT',
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
  return pools
}
