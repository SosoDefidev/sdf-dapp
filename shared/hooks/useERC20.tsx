import React from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'

import { ERC20_ABI } from '../constants'

const useERC20 = (erc20Address: string, account: string, web3: Web3) => {
  const wallet = useWallet()

  return React.useMemo(() => {
    const approve = async (_spender: string, _value: string): Promise<any> => {
      if (wallet.status !== 'connected') {
        return
      }
      const erc20 = new web3.eth.Contract(ERC20_ABI, erc20Address)
      return erc20.methods.approve(_spender, _value).send({
        from: account
      })
    }

    const allowance = async (address: string): Promise<string> => {
      if (!account) {
        return '0'
      }
      const erc20 = new web3.eth.Contract(ERC20_ABI, erc20Address)
      return erc20.methods.allowance(account, address).call()
    }

    const totalSupply = async (): Promise<string> => {
      const erc20 = new web3.eth.Contract(ERC20_ABI, erc20Address)
      return erc20.methods.totalSupply().call()
    }

    const balanceOf = async (address: string): Promise<string> => {
      const erc20 = new web3.eth.Contract(ERC20_ABI, erc20Address)
      return erc20.methods.balanceOf(address).call()
    }

    return { approve, allowance, totalSupply, balanceOf }
  }, [erc20Address, account, web3])
}

export default useERC20
