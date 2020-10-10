import { Button, Input, Typography } from 'antd'
import BigNumber from 'bignumber.js'
import React from 'react'
import { useAsyncRetry } from 'react-use'

import { TokenType } from '@/api'
import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import { TopPanel, TopPanelContainer } from '@/components/TopPanel'
import USDTSvg from '@/icons/USDT.svg'
import useERC20 from '@/shared/hooks/useERC20'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { usePool } from '@/shared/providers/PoolProvider'
import { useViewport } from '@/shared/providers/ViewportProvider'

import PoolInfo from './PoolInfo'

type ActionType = 'farm' | 'unfarm'

const { Text } = Typography

const Expand = ({
  action,
  token,
  onClick,
  close
}: {
  action: ActionType
  token?: TokenType
  onClick: (value: string, action: ActionType) => Promise<any>
  close: () => void
}) => {
  const theme = useTheme()
  const { account, web3 } = useApp()

  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const erc20 = useERC20(token?.address || '', account, web3)

  const { value: tokenBalance } = useAsyncRetry(async () => {
    const balanceWei = await erc20.balanceOf(account)
    return web3.utils.fromWei(balanceWei ?? '0')
  }, [account, erc20, web3])

  return (
    <>
      <div className="container">
        <Input
          prefix={<USDTSvg width={22} height={22} />}
          suffix="USDT"
          placeholder="0.00"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ textAlign: 'right' }}>
          <Text type="secondary">My balance: {tokenBalance}</Text>
        </p>
        <div className="submit">
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={() => {
              setLoading(true)
              onClick(value, action).finally(() => {
                setLoading(false)
              })
            }}>
            {action === 'farm' ? 'Farm' : 'Unfarm'}
          </Button>
          <Button size="large" onClick={close}>
            Close
          </Button>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 6px;
        }

        .container :global(.ant-btn) {
          width: 40%;
          border-radius: 8px;
          background-color: transparent;
        }
        .container :global(.ant-btn-primary) {
          background-color: #fddb93;
          border-color: #fddb93;
          color: ${theme['@primary-color']};
        }

        .submit {
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: 30px;
        }

        @media screen and (max-width: 736px) {
          .container :global(.ant-btn) {
            width: 100%;
            margin-top: 20px;
          }
          .submit {
            flex-direction: column;
          }
        }
      `}</style>
      <style jsx global>{`
        .ant-input-affix-wrapper,
        .ant-input-affix-wrapper:hover,
        .ant-input-affix-wrapper-focusd {
          padding: 8px 0;
          background-color: transparent;
          border-color: transparent;
          box-shadow: none;
          border-bottom-color: #c5c5c5;
        }
        .ant-input-affix-wrapper input {
          background-color: transparent;
        }
        .ant-input-affix-wrapper:hover,
        .ant-input-affix-wrapper-focusd {
          border-bottom-color: ${theme['@primary-color']};
        }
        .ant-input-prefix {
          margin-right: 12px;
        }
        .ant-input-suffix {
          margin-left: 12px;
        }
      `}</style>
    </>
  )
}

const Farm: React.FunctionComponent = () => {
  const theme = useTheme()
  const [action, setAction] = React.useState<ActionType>('farm')
  const [currentToken, setCurrentToken] = React.useState<TokenType>()
  const app = useApp()
  const { width } = useViewport()
  const { account, currentPool, maxValue, web3 } = useApp()
  const erc20 = useERC20(currentToken?.address || '', account, web3)
  const pool = usePool()

  const options: DataType[] = [
    { width: width > 736 ? '35%' : '100%' },
    { width: width > 736 ? '35%' : '100%' },
    { width: width > 736 ? '30%' : '100%' }
  ]

  const combineOptions = (data: DataType[]): DataType[] =>
    data.map((d, index) => ({ ...d, ...options[index] }))

  const Items = ({ title, desc }: { title: string; desc: string }) => {
    return (
      <>
        <div className="text">
          <h6>{title}</h6>
          <p>{desc}</p>
        </div>
        <style jsx>{`
          .text h6 {
            margin: 0;
            color: ${theme['@text-color']};
            font-size: 14px;
            line-height: 20px;
          }
          .text p {
            margin: 0;
            color: ${theme['@text-color-secondary']};
            font-size: 12px;
            line-height: 20px;
          }

          @media screen and (max-width: 736px) {
            .text {
              margin-bottom: 16px;
            }
            .text h6 {
              font-size: 16px;
              line-height: 26px;
            }
            .text p {
              font-size: 12px;
              line-height: 26px;
            }
          }
        `}</style>
      </>
    )
  }

  const items = app.currentPool.supportTokens.map((token) =>
    combineOptions([
      {
        title: (
          <Items
            title={new BigNumber(web3.utils.fromWei(pool.totalLocked)).toFixed(4) + 'USDT'}
            desc={token.name}
          />
        )
      },
      {
        title: (
          <Items
            title={new BigNumber(web3.utils.fromWei(pool.reward)).toFixed(4) + 'SDF'}
            desc="Currently Farming"
          />
        )
      },
      {
        title: (
          <div>
            <Button
              type="link"
              onClick={() => {
                setAction('farm')
                setCurrentToken(token)
              }}>
              Farm
            </Button>
            <Button
              type="text"
              onClick={() => {
                setAction('unfarm')
                setCurrentToken(token)
              }}>
              Unfarm
            </Button>
            <style jsx>{`
              div {
                text-align: right;
              }
            `}</style>
          </div>
        )
      }
    ])
  )

  const renderExpand = () => (
    <Expand
      action={action}
      token={currentToken}
      onClick={(value, action) => {
        return erc20
          .allowance(currentPool.address + '')
          .then((num) => {
            if (
              new BigNumber(num).isLessThan(
                new BigNumber(value).multipliedBy(new BigNumber(web3.utils.toWei('1')))
              )
            ) {
              return erc20.approve(currentPool.address, maxValue)
            }
          })
          .then(() => {
            if (action === 'farm') {
              if (currentToken) {
                return pool.stake(
                  currentToken.address,
                  new BigNumber(value)
                    .multipliedBy(new BigNumber(10 ** currentToken.decimals))
                    .toFixed(0)
                )
              }
            } else {
              if (currentToken) {
                return pool.withdraw(
                  currentToken.address || '',
                  new BigNumber(value)
                    .multipliedBy(new BigNumber(10 ** currentToken.decimals))
                    .toFixed(0)
                )
              }
            }
          })
      }}
      close={() => setCurrentToken(undefined)}
    />
  )

  return (
    <>
      <TopPanelContainer>
        <TopPanel type="primary">
          <PoolInfo />
        </TopPanel>
      </TopPanelContainer>
      <div className="list">
        <List>
          {items.map((item, index) => (
            <List.Item
              data={item}
              key={index}
              renderExpand={
                currentToken?.address === app.currentPool.supportTokens[index].address
                  ? renderExpand
                  : undefined
              }
            />
          ))}
        </List>
      </div>
      <style jsx>{`
        .list {
          margin-top: 40px;
        }
      `}</style>
    </>
  )
}

export default Farm
