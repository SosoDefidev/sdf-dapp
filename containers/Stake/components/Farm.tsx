import { Button, Col, Input, Row } from 'antd'
import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import { TopPanel, TopPanelContainer } from '@/components/TopPanel'
import USDTSvg from '@/icons/USDT.svg'
import useTheme from '@/shared/hooks/useTheme'
import { useViewport } from '@/shared/providers/ViewportProvider'

import PoolInfo from './PoolInfo'

const Expand = ({ close }: { close: () => void }) => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <Input prefix={<USDTSvg width={22} height={22} />} suffix="USDT" placeholder="0.00" />
        <div className="submit">
          <Button type="primary" size="large">
            Farm
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
  const [expandIndex, setExpandIndex] = React.useState(-1)
  const { width } = useViewport()

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

  const items = Array.from({ length: 2 }).map((_, index) =>
    combineOptions([
      {
        title: <Items title="0USDT" desc="USDT,USDC,TUSD,DAI" />
      },
      {
        title: <Items title="0USDT" desc="Currently Farming" />
      },
      {
        title: (
          <div>
            <Button type="link" onClick={() => setExpandIndex(index)}>
              Farm
            </Button>
            <Button type="text">Unfarm</Button>
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

  const renderExpand = () => <Expand close={() => setExpandIndex(-1)} />

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
              renderExpand={expandIndex === index ? renderExpand : undefined}
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
