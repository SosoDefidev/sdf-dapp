import { Typography } from 'antd'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

const { Text, Title } = Typography

const PoolInfo: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <div className="container">
      <div className="content">
        <div className="cell">
          <Text type="secondary">Current Epoch Reward</Text>
          <Title level={4}>809,317.45 SDF</Title>
        </div>
        <div className="cell">
          <Text type="secondary">Your Estimated 24h Reward</Text>
          <Title level={4}>809,317.45 SDF</Title>
        </div>
      </div>
      <img src="/imgs/pool-info.png" alt="sdf" />
      <style jsx>{`
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

        .content {
          flex: 1;
        }
        .cell {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;

          white-space: nowrap;
          line-height: 26px;
        }

        @media screen and (max-width: 736px) {
          .container {
            padding-right: 80px;
          }
          .container > img {
            display: none;
          }

          .cell {
            flex-direction: column;
            align-items: flex-start;

            white-space: nowrap;
            line-height: 26px;
          }
        }
      `}</style>
    </div>
  )
}

export default PoolInfo
