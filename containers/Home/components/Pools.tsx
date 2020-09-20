import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import useTheme from '@/shared/hooks/useTheme'

const Pools: React.FunctionComponent = () => {
  const theme = useTheme()

  const options: DataType[] = [
    { width: '20%' },
    { width: '20%' },
    { width: '20%' },
    { width: '10%' },
    { width: '10%' },
    { width: '10%' },
    { width: '10%' }
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
            `}</style>
          </span>
        )
      },
      {
        title: '12,345,654.67'
      },
      {
        title: '$12,345,654.67'
      },
      {
        title: '0.01%'
      },
      {
        title: '1.2%'
      },
      {
        title: '1.34%'
      },
      {
        title: '67.65%'
      }
    ])
  )

  return (
    <>
      <List>
        <List.Item data={titles} />
        {items.map((item, index) => (
          <List.Item data={item} key={index} />
        ))}
      </List>
      <style jsx>{``}</style>
    </>
  )
}

export default Pools
