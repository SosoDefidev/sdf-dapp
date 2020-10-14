import { Button, Input, Typography } from 'antd'
import BigNumber from 'bignumber.js'
import React from 'react'
import { useAsyncRetry } from 'react-use'

import EnableButton from '@/components/Button/EnableButton'
import USDTSvg from '@/icons/USDT.svg'
import useERC20 from '@/shared/hooks/useERC20'
import useTheme from '@/shared/hooks/useTheme'
import { TokenType, useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { usePending } from '@/shared/providers/PendingProvider'
import { usePool } from '@/shared/providers/PoolProvider'

type ActionType = 'farm' | 'unfarm'

const { Text } = Typography

const Expand = ({
  action,
  token,
  close
}: {
  action: ActionType
  token?: TokenType
  close: () => void
}) => {
  const theme = useTheme()
  const { account, currentPool, maxValue, web3 } = useApp()
  const pool = usePool()
  const pending = usePending()
  const { t } = useLanguage()

  const [value, setValue] = React.useState('')
  const erc20 = useERC20(token?.address || '', account + '', web3)

  const { value: tokenBalance } = useAsyncRetry(async () => {
    const [balance, decimals] = await Promise.all([erc20.balanceOf(account + ''), erc20.decimals()])
    return new BigNumber(balance ?? '0')
      .div(new BigNumber(10 ** Number(decimals ?? '0')))
      .toFixed(6, BigNumber.ROUND_DOWN)
  }, [account, erc20, web3])

  return (
    <>
      <div className="container">
        <Input
          prefix={<USDTSvg width={22} height={22} />}
          suffix={currentPool?.name}
          placeholder="0.00"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p style={{ textAlign: 'right' }}>
          <Text type="secondary">
            {t('stake.farm.balance')}: {tokenBalance}
          </Text>
        </p>
        <div className="submit">
          <EnableButton
            type="primary"
            size="large"
            style={
              action === 'farm'
                ? {
                    backgroundColor: '#fddb93',
                    borderColor: '#fddb93',
                    color: theme['@primary-color']
                  }
                : {}
            }
            onClick={async () => {
              if (!token) {
                return
              }
              if (!value || isNaN(Number(value))) {
                return
              }

              if (action === 'farm') {
                const num = await erc20.allowance(currentPool?.address + '')

                if (
                  new BigNumber(num).isLessThan(
                    new BigNumber(value).multipliedBy(new BigNumber(10 ** token.decimals))
                  )
                ) {
                  pending.show('Approve pending')
                  await erc20.approve(currentPool?.address ?? '', maxValue).finally(() => {
                    pending.hide()
                  })
                }
                pool.stake(
                  token.address,
                  new BigNumber(value).multipliedBy(new BigNumber(10 ** token.decimals)).toFixed(0)
                )
              } else {
                await pool.withdraw(
                  token.address || '',
                  new BigNumber(value).multipliedBy(new BigNumber(10 ** token.decimals)).toFixed(0)
                )
              }
            }}>
            {action === 'farm' ? t('stake.farm.deposit') : t('stake.farm.withdraw')}
          </EnableButton>
          <Button size="large" onClick={close}>
            {t('stake.farm.close')}
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

export default Expand
