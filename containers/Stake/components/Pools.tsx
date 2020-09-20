import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import useTheme from '@/shared/hooks/useTheme'
const { Title } = Typography

const Pools: React.FunctionComponent<{ onSelect(): void }> = ({ onSelect }) => {
  const theme = useTheme()

  const options: DataType[] = [{ width: '40%' }, { width: '40%' }, { width: '20%' }]

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
      title: 'Contract'
    },
    {
      title: ''
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
        title: '0xC2D5...0AC8'
      },
      {
        title: (
          <>
            <Button shape="round" onClick={onSelect}>
              Farm <ArrowRightOutlined />
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
        )
      }
    ])
  )

  return (
    <>
      <div className="title">
        <Title level={3}>Select a farm to stake</Title>
      </div>
      <List>
        <List.Item data={titles} />
        {items.map((item, index) => (
          <List.Item data={item} key={index} />
        ))}
      </List>
      <style jsx>{`
        .title {
          margin: 40px 0;
        }
      `}</style>
    </>
  )
}

export default Pools
