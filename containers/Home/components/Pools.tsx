import { Statistic, Tag } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { useViewport } from '@/shared/providers/ViewportProvider'

const { Countdown } = Statistic

const Items = ({ label, value }: { label: React.ReactNode; value: React.ReactNode }) => {
  const theme = useTheme()

  return (
    <>
      <div>
        <label>{label}</label>
        <span>{value}</span>
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        label {
          display: none;
          color: ${theme['@text-color-secondary']};
        }

        span {
          color: ${theme['@text-color']};
        }

        @media screen and (max-width: 736px) {
          div {
            margin-top: 20px;
          }

          label {
            display: block;
          }

          span {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}

const Pools: React.FunctionComponent = () => {
  const theme = useTheme()
  const { pools, web3 } = useApp()
  const { width } = useViewport()
  const { t } = useLanguage()
  const router = useRouter()

  const options: DataType[] = [
    { width: width > 736 ? '20%' : '100%' },
    { width: width > 736 ? '20%' : '100%' },
    { width: width > 736 ? '20%' : '100%' },
    { width: width > 736 ? '10%' : '100%' },
    { width: width > 736 ? '10%' : '100%' },
    { width: width > 736 ? '10%' : '100%' },
    { width: width > 736 ? '10%' : '100%' }
  ]

  const combineOptions = (data: DataType[]): DataType[] =>
    data.map((d, index) => ({ ...d, ...options[index] }))

  const titles = combineOptions([
    {
      title: (
        <span>
          {t('home.list.pool')}
          <style jsx>{`
            span {
              padding-left: 42px;
            }
          `}</style>
        </span>
      )
    },
    {
      title: t('home.list.rewardPerBlock')
    },
    {
      title: t('home.list.totalLock')
    },
    {
      title: t('home.list.hourly')
    },
    {
      title: t('home.list.daily')
    },
    {
      title: t('home.list.weekly')
    },
    {
      title: t('home.list.apy')
    }
  ])

  const items = pools.map((pool) =>
    combineOptions([
      {
        title: (
          <span
            onClick={() => {
              router.push(`/stake?pool=${pool.address}`)
            }}>
            <div className="logo" />
            <div className="text">
              <div>
                <h6>{pool.name}</h6>
                <p>{pool.supportTokens.map((token) => token.name).join(',')}</p>
              </div>
              {Date.now() < pool.startTime && (
                <span style={{ textAlign: 'right' }}>
                  <Countdown
                    value={pool.startTime}
                    format="HH:mm:ss"
                    valueStyle={{
                      fontSize: 14,
                      color: theme['@primary-color']
                    }}
                  />
                </span>
              )}
            </div>
            <style jsx>{`
              span {
                display: flex;
                align-items: center;
              }
              .logo {
                flex: 0 0 auto;
                width: 30px;
                height: 30px;
                margin-right: 12px;
                border-radius: 15px;
                background-color: ${theme['@primary-color']};
                background: url(${pool.icon}) no-repeat;
                background-size: cover;
                background-position: center;
              }
              .text {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
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
        title: (
          <Items
            label={t('home.list.rewardPerBlock')}
            value={
              <Tag color="magenta" style={{ margin: 0 }}>
                {web3.utils.fromWei(pool.rewardPerBlock)}SDF
              </Tag>
            }
          />
        )
      },
      {
        title: (
          <Items label={t('home.list.totalLock')} value={web3.utils.fromWei(pool.totalLocked)} />
        )
      },
      {
        title: <Items label={t('home.list.hourly')} value={pool.hourRatio.toFixed(4) + '%'} />
      },
      {
        title: <Items label={t('home.list.daily')} value={(pool.hourRatio * 24).toFixed(4) + '%'} />
      },
      {
        title: (
          <Items label={t('home.list.weekly')} value={(pool.hourRatio * 24 * 7).toFixed(4) + '%'} />
        )
      },
      {
        title: <Items label={t('home.list.apy')} value={(pool.hourRatio * 365).toFixed(4) + '%'} />
      }
    ])
  )

  return (
    <>
      <List>
        {width > 736 && <List.Item data={titles} />}
        {items.map((item, index) => (
          <List.Item data={item} key={index} />
        ))}
      </List>
    </>
  )
}

export default Pools
