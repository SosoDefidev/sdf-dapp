import BigNumber from 'bignumber.js'
import React from 'react'
import { useWallet } from 'use-wallet'

import { POOL_ABI } from '../constants'
import { useApp } from './AppProvider'

const poolContext = React.createContext<{
  reward: string
  total: string // pool total
  totalLocked: string // user total in pool
  allPoolLocked: string // all pools loockd
  perRewardBlock: string
  stake(tokenAddress: string, amount: string): Promise<any>
  withdraw(tokenAddress: string, amount: string): Promise<any>
}>({} as any)

const PoolProvider: React.FunctionComponent = ({ children }) => {
  const wallet = useWallet()
  const { account, web3, currentPool, pools } = useApp()

  const [reward, setReward] = React.useState('0')
  const [total, setTotal] = React.useState('0')
  const [totalLocked, setTotalLocked] = React.useState('0')
  const [allPoolLocked, setAllPoolLocked] = React.useState('0')
  const [perRewardBlock, setPerRewardBlock] = React.useState('0')

  const initPool = () => {
    return new web3.eth.Contract(POOL_ABI, currentPool.address)
  }

  const stake = (tokenAddress: string, amount: string): Promise<any> => {
    if (wallet.status !== 'connected') {
      return Promise.resolve()
    }
    const pool = initPool()
    return pool.methods.stake(tokenAddress, amount).send({
      from: account
    })
  }

  const withdraw = async (tokenAddress: string, amount: string): Promise<any> => {
    if (wallet.status !== 'connected') {
      return
    }
    const pool = initPool()
    return pool.methods.withdraw(tokenAddress, amount).send({
      from: account
    })
  }

  const getTotal = React.useCallback(() => {
    const totalObj = { total: '0', totalLocked: '0' }
    if (!account) {
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
  }, [account, web3])

  const getAllPoolLocked = React.useCallback(() => {
    Promise.all(
      pools.map((pool) => {
        const contract = new web3.eth.Contract(POOL_ABI, pool.address)
        return contract.methods.weiTotalSupply().call()
      })
    ).then((data) => {
      if (data.length > 0) {
        const sum = data
          .map((d) => new BigNumber(d))
          .reduce((l, r) => {
            return l.plus(r)
          })
        setAllPoolLocked(sum.toFixed(0))
      } else {
        setAllPoolLocked('0')
      }
    })
  }, [account, web3, pools])

  const pendingReward = React.useCallback(() => {
    if (!account) {
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
  }, [account, web3])

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
  }, [pendingReward, getTotal, getAllPoolLocked, currentPool.address])

  React.useEffect(() => {
    const pool = initPool()
    pool.methods
      .BLOCK_REWARD()
      .call()
      .then((data: string) => {
        setPerRewardBlock(data)
      })
  }, [web3, currentPool.address])

  return (
    <poolContext.Provider
      value={{
        reward,
        total,
        totalLocked,
        allPoolLocked,
        perRewardBlock,
        stake,
        withdraw
      }}>
      {children}
    </poolContext.Provider>
  )
}

const usePool = () => {
  const {
    reward,
    total,
    totalLocked,
    allPoolLocked,
    perRewardBlock,
    stake,
    withdraw
  } = React.useContext(poolContext)

  return {
    reward,
    total,
    totalLocked,
    allPoolLocked,
    perRewardBlock,
    stake,
    withdraw
  }
}

export { PoolProvider, usePool }
