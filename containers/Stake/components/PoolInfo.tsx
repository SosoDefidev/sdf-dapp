import { Typography } from 'antd'
import BigNumber from 'bignumber.js'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { usePool } from '@/shared/providers/PoolProvider'

const { Text, Title } = Typography

const PoolInfo: React.FunctionComponent = () => {
  const theme = useTheme()
  const { web3 } = useApp()
  const pool = usePool()
  const { t } = useLanguage()

  const reward24h = new BigNumber((24 * 60 * 60) / 15).multipliedBy(
    new BigNumber(pool.perRewardBlock)
  )
  const estimated24h =
    Number(pool.total) > 0
      ? new BigNumber(pool.totalLocked).div(new BigNumber(pool.total)).multipliedBy(reward24h)
      : new BigNumber('0')

  return (
    <div className="container">
      <div className="content">
        <div className="cell">
          <Text type="secondary">{t('stake.farm.currentReward')}</Text>
          <Title level={4}>{web3.utils.fromWei(pool.perRewardBlock)} SDF</Title>
        </div>
        <div className="cell">
          <Text type="secondary">{t('stake.farm.reward24h')}</Text>
          <Title level={4}>
            {estimated24h.isNaN() ? '0' : estimated24h.div(10 ** 18).toFixed(4)} SDF
          </Title>
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
