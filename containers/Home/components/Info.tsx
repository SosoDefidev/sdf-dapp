import { Typography } from 'antd'
import React from 'react'

import { TopPanel, TopPanelContainer } from '@/components/TopPanel'

const { Text, Title } = Typography

const TokenInfo: React.FunctionComponent = () => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Text type="secondary">Circulating</Text>
          </td>
          <td>
            <Text>231,345,654.67 SDF</Text>
          </td>
        </tr>
        <tr>
          <td>
            <Text type="secondary">Current Total Supply</Text>
          </td>
          <td>
            <Text>564,345,654.67 SDF</Text>
          </td>
        </tr>
        <tr>
          <td>
            <Text type="secondary">Max Supply</Text>
          </td>
          <td>
            <Text>3,345,654.67 SDF</Text>
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
  return (
    <TopPanelContainer>
      <TopPanel type="primary">
        <Title level={3}>$809,317.45</Title>
        <Text type="secondary">Total Value Locked(USD)</Text>
      </TopPanel>
      <TopPanel>
        <Title level={3}>$809,317.45</Title>
        <Text type="secondary">Total Value Locked(USD)</Text>
      </TopPanel>
      <TopPanel>
        <TokenInfo />
      </TopPanel>
      <style jsx>{`
        :global(.panel.primary .ant-typography) {
          color: #fff;
        }
      `}</style>
    </TopPanelContainer>
  )
}

export default Info
