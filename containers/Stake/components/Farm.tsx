import { Button, Col, Input, Row } from 'antd'
import React from 'react'

import List from '@/components/List'
import { DataType } from '@/components/List/Item'
import { TopPanel, TopPanelContainer } from '@/components/TopPanel'
import USDTSvg from '@/icons/USDT.svg'
import useTheme from '@/shared/hooks/useTheme'

import PoolInfo from './PoolInfo'

const Expand = ({ close }: { close: () => void }) => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <Input prefix={<USDTSvg width={22} height={22} />} suffix="USDT" placeholder="0.00" />
        <Row>
          <Col span={8} offset={3}>
            <Button type="primary" size="large">
              Farm
            </Button>
          </Col>
          <Col span={8} offset={2}>
            <Button size="large" onClick={close}>
              Close
            </Button>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .container {
          padding: 6px;
        }
        .container :global(.ant-row) {
          margin-top: 30px;
        }
        .container :global(.ant-btn) {
          width: 100%;
          border-radius: 8px;
          background-color: transparent;
        }
        .container :global(.ant-btn-primary) {
          background-color: #fddb93;
          border-color: #fddb93;
          color: ${theme['@primary-color']};
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
  const options: DataType[] = [{ width: '35%' }, { width: '35%' }, { width: '30%' }]
  const [expandIndex, setExpandIndex] = React.useState(-1)

  const combineOptions = (data: DataType[]): DataType[] =>
    data.map((d, index) => ({ ...d, ...options[index] }))

  const ItemContainer = ({ title, desc }: { title: string; desc: string }) => {
    return (
      <>
        <div className="text">
          <h6>{title}</h6>
          <p>{desc}</p>
        </div>
        <style jsx>{`
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
      </>
    )
  }

  const items = Array.from({ length: 2 }).map((_, index) =>
    combineOptions([
      {
        title: <ItemContainer title="0USDT" desc="USDT,USDC,TUSD,DAI" />
      },
      {
        title: <ItemContainer title="0USDT" desc="Currently Farming" />
      },
      {
        title: (
          <>
            <Button type="link" onClick={() => setExpandIndex(index)}>
              Farm
            </Button>
            <Button type="text">Unfarm</Button>
          </>
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
