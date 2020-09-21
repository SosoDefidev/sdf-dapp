import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import useTheme from '@/shared/hooks/useTheme'
import { useViewport } from '@/shared/providers/ViewportProvider'
const { Title } = Typography

const Pools: React.FunctionComponent<{ onSelect(): void }> = ({ onSelect }) => {
  const theme = useTheme()
  const { width } = useViewport()

  const options: DataType[] = [
    { width: width > 736 ? '40%' : '100%' },
    { width: width > 736 ? '40%' : '100%' },
    { width: width > 736 ? '20%' : '100%' }
  ]

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
              {width <= 736 && <p>0xC2D5...0AC8</p>}
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
        title: width > 736 && <Items>0xC2D5...0AC8</Items>
      },
      {
        title: (
          <Items>
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
          </Items>
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
