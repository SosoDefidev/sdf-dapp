import Web3 from 'web3'

import { ERC20_ABI } from '@/shared/constants'

let web3: Web3

export const getWeb3 = (provider?: any): Web3 => {
  if (!web3) {
    if (!provider) {
      throw new Error('invalid provider')
    }
    web3 = new Web3(provider)
  }

  return web3
}

export const getERC20 = (address: string) => {
  const web3 = getWeb3()

  const erc20Contract = new web3.eth.Contract(ERC20_ABI, address)

  return erc20Contract
}
