import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import useTheme from '@/shared/hooks/useTheme'
import { useViewport } from '@/shared/providers/ViewportProvider'

const Pools: React.FunctionComponent = () => {
  const theme = useTheme()
  const { width } = useViewport()

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

  const Items = ({ label, value }: { label: string; value: string }) => (
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
      title: 'Staked'
    },
    {
      title: 'Total Value Locked'
    },
    {
      title: 'Hourly'
    },
    {
      title: 'Daily'
    },
    {
      title: 'Weekly'
    },
    {
      title: 'APY'
    }
  ])

  const items = Array.from({ length: 2 }, () =>
    combineOptions([
      {
        title: (
          <span>
            <div className="logo" />
            <div className="text">
              <h6>Seed Pool v2</h6>
              <p>USDT,USDC,TUSD,DAI</p>
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
                background-color: ${theme['@primary-color']};
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
        title: <Items label="Staked" value="12,345,654.67" />
      },
      {
        title: <Items label="Total Value Locked" value="$12,345,654.67" />
      },
      {
        title: <Items label="Hourly" value="0.01%" />
      },
      {
        title: <Items label="Daily" value="1.2%" />
      },
      {
        title: <Items label="Weekly" value="1.34%" />
      },
      {
        title: <Items label="APY" value="67.65%" />
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
