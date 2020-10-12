import React from 'react'
import { useWallet } from 'use-wallet'

import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { shortenAddress } from '@/utils/string'

import ActiveLink from '../ActiveLink'

const Navbar: React.FunctionComponent = () => {
  const wallet = useWallet()
  const { account } = useApp()
  const theme = useTheme()

  return (
    <>
      <nav>
        <div className="links">
          <ActiveLink href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/stake">
            <a>Stake</a>
          </ActiveLink>
        </div>
        {
          <div
            className="unlock"
            onClick={() => {
              if (account) return

              wallet.connect('injected')
            }}>
            <img src={require('@/assets/imgs/unlock-wallet.png')} alt="Unlock Wallet" />
            {shortenAddress(account) || 'Unlock Wallet'}
          </div>
        }
      </nav>
      <style jsx>{`
        nav {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: ${theme['@container-width']};
          padding: 12px 0;
          margin: 15px auto 0 auto;
          border-bottom: 1px solid #ebebeb;
        }
        nav a {
          margin-right: 65px;
          font-size: 24px;
          color: #c7c7c7;
          line-height: 32px;
        }
        nav a:nth-last-of-type(1) {
          margin-right: 0;
        }
        nav :global(.active) {
          color: #1b1b1b !important;
        }

        .unlock {
          display: flex;
          align-items: center;

          font-size: 24px;
          color: #1b1b1b;
          line-height: 32px;
          cursor: pointer;
        }
        .unlock img {
          margin-right: 17px;
        }
        @media screen and (max-width: 736px) {
          nav {
            width: 100%;
            padding: 12px 26px;
            background-color: #fff;
          }
          nav a {
            margin-right: 40px;
            font-size: 16px;
            line-height: 24px;
          }

          .unlock {
            right: 26px;
            font-size: 16px;
            color: #1b1b1b;
            line-height: 24px;
          }
          .unlock img {
            width: 16px;
            margin-right: 8px;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar
