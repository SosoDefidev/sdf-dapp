import BigNumber from 'bignumber.js'
import React from 'react'
import { useWallet } from 'use-wallet'

import { delay } from '@/utils'

import { POOL_ABI } from '../constants'
import { useApp } from './AppProvider'
import { usePending } from './PendingProvider'

const poolContext = React.createContext<{
  reward: string
  total: string // pool total
  totalLocked: string // user total in pool
  allPoolLocked: string // all pools loockd
  perRewardBlock: string
  stake(tokenAddress: string, amount: string): Promise<any>
  withdraw(tokenAddress: string, amount: string): Promise<any>
  tokenLocked(tokenAddress: string): Promise<any> // get token locked
}>({} as any)

const PoolProvider: React.FunctionComponent = ({ children }) => {
  const wallet = useWallet()
  const { account, web3, currentPool, pools } = useApp()
  const pending = usePending()

  const [reward, setReward] = React.useState('0')
  const [total, setTotal] = React.useState('0')
  const [totalLocked, setTotalLocked] = React.useState('0')
  const [allPoolLocked, setAllPoolLocked] = React.useState('0')
  const [perRewardBlock, setPerRewardBlock] = React.useState('0')

  const currentWeb3 = React.useRef(web3)
  React.useEffect(() => {
    currentWeb3.current = web3
  }, [web3])

  const initPool = () => {
    return new currentWeb3.current.eth.Contract(POOL_ABI, currentPool?.address)
  }

  const stake = async (tokenAddress: string, amount: string): Promise<any> => {
    pending.show('Staking pending')

    if (wallet.status !== 'connected') {
      await wallet.connect('injected')
      await delay(100)
    }

    const pool = initPool()

    return pool.methods
      .stake(tokenAddress, amount)
      .send({
        from: (await currentWeb3.current.eth.getAccounts())[0]
      })
      .then(() => {
        pending.success('Stake success')
      })
      .catch(() => {
        pending.fail('Stake failed')
      })
  }

  const withdraw = async (tokenAddress: string, amount: string): Promise<any> => {
    pending.show('Withdraw pending')

    if (wallet.status !== 'connected') {
      await wallet.connect('injected')
      await delay(100)
    }

    const pool = initPool()

    return pool.methods
      .withdraw(tokenAddress, amount)
      .send({
        from: (await currentWeb3.current.eth.getAccounts())[0]
      })
      .then(() => {
        pending.success('Withdraw success')
      })
      .catch(() => {
        pending.fail('Withdraw failed')
      })
  }

  const getTotal = React.useCallback(() => {
    const totalObj = { total: '0', totalLocked: '0' }
    if (!account) {
      return totalObj
    }
    if (!currentPool) {
      return totalObj
    }

    const pool = initPool()
    return pool.methods
      .weiTotalSupply()
      .call()
      .then((data: string) => {
        setTotal(data)
        totalObj.total = data
        return pool.methods.weiBalanceOf(account).call()
      })
      .then((data: string) => {
        setTotalLocked(data)
        totalObj.totalLocked = data
        return totalObj
      })
  }, [account, web3, currentPool])

  const tokenLocked = async (tokenAddress: string): Promise<string> => {
    if (!account) {
      return '0'
    }
    if (!currentPool) {
      return '0'
    }

    const pool = initPool()
    return pool.methods.balanceOf(tokenAddress, account).call()
  }

  const getAllPoolLocked = React.useCallback(() => {
    Promise.all(
      pools.map((pool) => {
        const contract = new web3.eth.Contract(POOL_ABI, pool.address)
        return contract.methods.weiTotalSupply().call()
      })
    ).then((data) => {
      if (data.length > 0) {
        const sum = data
          .map((d, i) => new BigNumber(d).multipliedBy(new BigNumber(pools[i].price)))
          .reduce((l, r) => {
            return l.plus(r)
          })
        setAllPoolLocked(sum.toFixed(0, BigNumber.ROUND_DOWN))
      } else {
        setAllPoolLocked('0')
      }
    })
  }, [account, web3, pools])

  const pendingReward = React.useCallback(() => {
    if (!account) {
      return '0'
    }
    if (!currentPool) {
      return '0'
    }

    const pool = initPool()
    return pool.methods
      .pendingReward(account)
      .call()
      .then((data: string) => {
        setReward(data)
        return data
      })
  }, [account, currentPool, web3])

  React.useEffect(() => {
    pendingReward()
    getTotal()
    getAllPoolLocked()

    const interval = setInterval(() => {
      pendingReward()
      getTotal()
      getAllPoolLocked()
    }, 1000)

    return () => clearInterval(interval)
  }, [pendingReward, getTotal, getAllPoolLocked, account, currentPool, web3])

  React.useEffect(() => {
    if (!currentPool?.address) {
      return
    }

    const pool = initPool()
    pool.methods
      .BLOCK_REWARD()
      .call()
      .then((data: string) => {
        setPerRewardBlock(data)
      })
  }, [web3, currentPool?.address])

  return (
    <poolContext.Provider
      value={{
        reward,
        total,
        totalLocked,
        allPoolLocked,
        perRewardBlock,
        stake,
        withdraw,
        tokenLocked
      }}>
      {children}
    </poolContext.Provider>
  )
}

const usePool = () => {
  const context = React.useContext(poolContext)

  return context
}

export { PoolProvider, usePool }
