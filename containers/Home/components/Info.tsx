import { Typography } from 'antd'
import React from 'react'

import { TopPanel, TopPanelContainer } from '@/components/TopPanel'
import { useApp } from '@/shared/providers/AppProvider'
import { usePool } from '@/shared/providers/PoolProvider'

const { Text, Title } = Typography

const TokenInfo: React.FunctionComponent = () => {
  const { totalSupply, maxSupply, circulating, web3 } = useApp()

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Text type="secondary">Circulating</Text>
          </td>
          <td>
            <Text>{web3.utils.fromWei(circulating)} SDF</Text>
          </td>
        </tr>
        <tr>
          <td>
            <Text type="secondary">Current Total Supply</Text>
          </td>
          <td>
            <Text>{web3.utils.fromWei(totalSupply)} SDF</Text>
          </td>
        </tr>
        <tr>
          <td>
            <Text type="secondary">Max Supply</Text>
          </td>
          <td>
            <Text>{web3.utils.fromWei(maxSupply)} SDF</Text>
          </td>
        </tr>
      </tbody>
      <style jsx>{`
        table tr td {
          padding: 5px 0;

          font-weight: 400;
          line-height: 26px;
          white-space: nowrap;
          text-align: right;
        }
        table tr td:nth-of-type(1) {
          padding-right: 12px;
          text-align: left;
        }
      `}</style>
    </table>
  )
}

const Info: React.FunctionComponent = () => {
  const app = useApp()
  const pool = usePool()
  const { web3 } = app

  return (
    <div>
      <TopPanelContainer>
        <TopPanel type="primary">
          <Title level={3}>${web3.utils.fromWei(pool.allPoolLocked)}</Title>
          <Text type="secondary">Total Value Locked(USD)</Text>
        </TopPanel>
        <TopPanel>
          <Title level={3}>${app.sdfPrice}</Title>
          <Text type="secondary">SDF Price(USD)</Text>
        </TopPanel>
        <TopPanel>
          <TokenInfo />
        </TopPanel>
      </TopPanelContainer>
      <style jsx>{`
        :global(.panel.primary .ant-typography) {
          color: #fff;
        }
        div > :global(.container) {
          padding: 0 20px;
        }
      `}</style>
    </div>
  )
}

export default Info
