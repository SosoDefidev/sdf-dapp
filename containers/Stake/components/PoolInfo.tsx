import { Typography } from 'antd'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

const { Text, Title } = Typography

const PoolInfo: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <div className="container">
      <table>
        <tbody>
          <tr>
            <td>
              <Text type="secondary">Current Epoch Reward</Text>
            </td>
            <td>
              <Title level={4}>809,317.45 SDF</Title>
            </td>
          </tr>
          <tr>
            <td>
              <Text type="secondary">Your Estimated 24h Reward</Text>
            </td>
            <td>
              <Title level={4}>809,317.45 SDF</Title>
            </td>
          </tr>
        </tbody>
      </table>
      <img src="/imgs/pool-info.png" alt="sdf" />
      <style jsx>{`
        table {
          flex: 1;
        }
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

        .container {
          display: flex;
          align-items: center;
          padding-right: 160px;
        }
        .container :global(.ant-typography.ant-typography-secondary) {
          color: ${theme['@text-color-secondary']};
        }
        .container :global(.ant-typography) {
          margin: 0;
          color: #fff;
        }
        .container > img {
          width: 150px;
          margin-left: 150px;
        }
      `}</style>
    </div>
  )
}

export default PoolInfo
