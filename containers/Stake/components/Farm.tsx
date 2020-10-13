import { Button, Space } from 'antd'
import BigNumber from 'bignumber.js'
import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import { TopPanel, TopPanelContainer } from '@/components/TopPanel'
import useTheme from '@/shared/hooks/useTheme'
import { TokenType, useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { usePool } from '@/shared/providers/PoolProvider'
import { useViewport } from '@/shared/providers/ViewportProvider'

import Expand from './Expand'
import PoolInfo from './PoolInfo'

type ActionType = 'farm' | 'unfarm'

const Items = ({ title, desc }: { title: string; desc: React.ReactNode }) => {
  const theme = useTheme()

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

const TokenLocked: React.FunctionComponent<{ token: TokenType }> = ({ token }) => {
  const [locked, setLocked] = React.useState('0')
  const pool = usePool()

  React.useEffect(() => {
    pool.tokenLocked(token.address).then((data) => {
      setLocked(data)
    })
  }, [token.address])

  return (
    <Items
      title={
        new BigNumber(locked)
          .div(new BigNumber(10 ** token.decimals))
          .toFixed(6, BigNumber.ROUND_DOWN) + token.name
      }
      desc={token.name}
    />
  )
}

const Farm: React.FunctionComponent = () => {
  const theme = useTheme()
  const [action, setAction] = React.useState<ActionType>('farm')
  const [currentToken, setCurrentToken] = React.useState<TokenType>()
  const app = useApp()
  const { width } = useViewport()
  const { web3 } = useApp()
  const pool = usePool()
  const { t } = useLanguage()

  const options: DataType[] = [
    { width: width > 736 ? '35%' : '100%' },
    { width: width > 736 ? '35%' : '100%' },
    { width: width > 736 ? '30%' : '100%' }
  ]

  const combineOptions = (data: DataType[]): DataType[] =>
    data.map((d, index) => ({ ...d, ...options[index] }))

  const items = app.currentPool.supportTokens.map((token) =>
    combineOptions([
      {
        title: <TokenLocked token={token} />
      },
      {
        title: (
          <Items
            title={
              new BigNumber(web3.utils.fromWei(pool.reward)).toFixed(6, BigNumber.ROUND_DOWN) +
              'SDF'
            }
            desc={t('stake.farm.currentFarming')}
          />
        )
      },
      {
        title: (
          <Space style={{ float: 'right' }}>
            <Button
              style={{
                backgroundColor: '#fddb93',
                borderColor: '#fddb93',
                color: theme['@primary-color']
              }}
              type="primary"
              size="small"
              onClick={() => {
                setAction('farm')
                setCurrentToken(token)
              }}>
              {t('stake.farm.deposit')}
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setAction('unfarm')
                setCurrentToken(token)
              }}>
              {t('stake.farm.withdraw')}
            </Button>
          </Space>
        )
      }
    ])
  )

  const renderExpand = () => (
    <Expand action={action} token={currentToken} close={() => setCurrentToken(undefined)} />
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
