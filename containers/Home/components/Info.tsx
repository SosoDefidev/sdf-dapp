import { Typography } from 'antd'
import React from 'react'

import { TopPanel, TopPanelContainer } from '@/components/TopPanel'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { usePool } from '@/shared/providers/PoolProvider'

const { Text, Title } = Typography

const TokenInfo: React.FunctionComponent = () => {
  const { currentSupply, circulating, web3 } = useApp()
  const { t } = useLanguage()

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Text type="secondary">{t('home.circulating')}</Text>
          </td>
          <td>
            <Text>{Number(web3.utils.fromWei(circulating)).toFixed(4)} SDF</Text>
          </td>
        </tr>
        <tr>
          <td>
            <Text type="secondary">{t('home.currentSupply')}</Text>
          </td>
          <td>
            <Text>{Number(web3.utils.fromWei(currentSupply)).toFixed(4)} SDF</Text>
          </td>
        </tr>
        {/* <tr>
          <td>
            <Text type="secondary">{t('home.maxSupply')}</Text>
          </td>
          <td>
            <Text>{web3.utils.fromWei(maxSupply)} SDF</Text>
          </td>
        </tr> */}
      </tbody>
      <style jsx>{`
        table {
          width: 100%;
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
      `}</style>
    </table>
  )
}

const Info: React.FunctionComponent = () => {
  const { web3, sdfPrice } = useApp()
  const pool = usePool()
  const { t } = useLanguage()

  return (
    <div>
      <TopPanelContainer>
        <TopPanel type="primary">
          <Title level={3}>${web3.utils.fromWei(pool.allPoolLocked)}</Title>
          <Text type="secondary">{t('home.totalLock')}(USD)</Text>
        </TopPanel>
        <TopPanel>
          <Title level={3}>${sdfPrice}</Title>
          <Text type="secondary">{t('home.sdfPrice')}(USD)</Text>
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
