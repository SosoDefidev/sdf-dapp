import React from 'react'
import { useWallet } from 'use-wallet'

import useTheme from '@/shared/hooks/useTheme'

import ActiveLink from '../ActiveLink'

const Navbar: React.FunctionComponent = () => {
  const { connect } = useWallet()
  const theme = useTheme()

  return (
    <>
      <nav>
        <ActiveLink href="/">
          <a>Home</a>
        </ActiveLink>
        <ActiveLink href="stake">
          <a>Stake</a>
        </ActiveLink>
        <div className="unlock" onClick={() => connect('injected')}>
          <img src={require('@/assets/imgs/unlock-wallet.png')} alt="Unlock Wallet" />
          Unlock Wallet
        </div>
      </nav>
      <style jsx>{`
        nav {
          position: relative;
          display: flex;
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
          position: absolute;
          right: 0;

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
      `}</style>
    </>
  )
}

export default Navbar
