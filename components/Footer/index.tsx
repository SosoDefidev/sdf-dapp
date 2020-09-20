import { Col, Row, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'

import FacebookSvg from '@/icons/facebook.svg'
import GithubSvg from '@/icons/github.svg'
import TwitterSvg from '@/icons/twitter.svg'
import useTheme from '@/shared/hooks/useTheme'

const { Text } = Typography

const Footer: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <footer>
        <div className="container">
          <Row>
            <Col span={6}>
              <div className="footer-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </div>
              <div className="footer-item">
                <Link href="/stake">
                  <a>Stake</a>
                </Link>
              </div>
            </Col>
            <Col span={6}>
              <div className="footer-item">
                <Link href="https://www.etherscan.io">
                  <a target="_blank" rel="noopener noreferrer">
                    Token Contract
                  </a>
                </Link>
              </div>
              <div className="footer-item">
                <Link href="https://app.uniswap.org">
                  <a target="_blank" rel="noopener noreferrer">
                    Uniswap
                  </a>
                </Link>
              </div>
            </Col>
            <Col span={6} offset={6}>
              <div className="footer-links">
                <a
                  href="https://twitter.com/sosodefi_com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <TwitterSvg width={22} />
                </a>
                {/* <a href="http://" target="_blank" rel="noopener noreferrer">
                  <FacebookSvg width={22} />
                </a> */}
                <a href="https://github.com/SosoDefi" target="_blank" rel="noopener noreferrer">
                  <GithubSvg width={22} />
                </a>
              </div>
            </Col>
          </Row>
        </div>
        <div className="copyright">
          <Text type="secondary">Copyright © 2020 Telos Foundation All rights reserved</Text>
        </div>
      </footer>
      <style jsx>{`
        footer {
          margin-top: 120px;
        }
        .container {
          width: ${theme['@container-width']};
          margin: 0 auto;
          padding: 40px 0;
        }

        .footer-item a {
          color: ${theme['@text-color-secondary']};
        }

        .footer-links > a {
          margin-left: 20px;
        }

        .copyright {
          padding: 16px 0;
          text-align: center;
          background-color: rgba(131, 131, 131, 0.11);
        }
      `}</style>
    </>
  )
}

export default Footer
