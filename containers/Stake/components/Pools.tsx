import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React from 'react'
import { useWallet } from 'use-wallet'

import { PoolType } from '@/api'
import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import { SCAN_URL } from '@/shared/constants'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { useViewport } from '@/shared/providers/ViewportProvider'
import { shortenAddress } from '@/utils/string'
const { Title } = Typography

const Items: React.FunctionComponent = ({ children }) => (
  <>
    <div>{children}</div>
    <style jsx>{`
      div {
      }

      @media screen and (max-width: 736px) {
        div {
          margin-top: 20px;
        }
      }
    `}</style>
  </>
)

const Pools: React.FunctionComponent<{ onSelect(pool: PoolType): void }> = ({ onSelect }) => {
  const theme = useTheme()
  const { width } = useViewport()
  const wallet = useWallet()
  const { pools } = useApp()
  const { t } = useLanguage()

  const options: DataType[] = [
    { width: width > 736 ? '40%' : '100%' },
    { width: width > 736 ? '40%' : '100%' },
    { width: width > 736 ? '20%' : '100%' }
  ]

  const combineOptions = (data: DataType[]): DataType[] =>
    data.map((d, index) => ({ ...d, ...options[index] }))

  const titles = combineOptions([
    {
      title: (
        <span>
          Pool
          <style jsx>{`
            span {
              padding-left: 42px;
            }
          `}</style>
        </span>
      )
    },
    {
      title: t('stake.pool.contract')
    },
    {
      title: ''
    }
  ])

  const items = pools.map((pool) =>
    combineOptions([
      {
        title: (
          <span>
            <div className="logo" />
            <div className="text">
              <h6>{pool.name}</h6>
              <p>{pool.supportTokens.map((token) => token.name).join(',')}</p>
              {width <= 736 && (
                <a
                  href={SCAN_URL[wallet.chainId + ''] + '/address/' + pool.address}
                  target="_blank"
                  rel="noopener noreferrer">
                  <p>{shortenAddress(pool.address)}</p>
                </a>
              )}
            </div>
            <style jsx>{`
              span {
                display: flex;
                align-items: center;
              }
              .logo {
                width: 30px;
                height: 30px;
                margin-right: 12px;
                border-radius: 15px;
                background: url(${pool.icon}) no-repeat;
                background-size: cover;
                background-position: center;
              }
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
                span {
                  display: flex;
                  align-items: center;
                }
                .logo {
                  width: 60px;
                  height: 60px;
                  margin-right: 20px;
                  border-radius: 30px;
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
          </span>
        )
      },
      {
        title: width > 736 && (
          <Items>
            <a
              href={SCAN_URL[wallet.chainId + ''] + '/address/' + pool.address}
              target="_blank"
              rel="noopener noreferrer">
              <p>{shortenAddress(pool.address)}</p>
            </a>
          </Items>
        )
      },
      {
        title: (
          <Items>
            <>
              <Button shape="round" onClick={() => onSelect(pool)}>
                {t('stake.pool.farm')} <ArrowRightOutlined />
              </Button>
              <style jsx global>{`
                .ant-btn.ant-btn-round {
                  padding: 0 30px;
                  color: #fddb93;
                  background-color: transparent;
                  border-color: #fddb93;
                }
              `}</style>
            </>
          </Items>
        )
      }
    ])
  )

  return (
    <>
      <div className="title">
        <Title level={3}>{t('stake.pool.title')}</Title>
      </div>
      <List>
        {width > 736 && <List.Item data={titles} />}
        {items.map((item, index) => (
          <List.Item data={item} key={index} />
        ))}
      </List>
      <style jsx>{`
        .title {
          margin: 40px 0;
        }

        @media screen and (max-width: 736px) {
          .title {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default Pools
