import { Typography } from 'antd'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

import Info from './components/Info'
import Pools from './components/Pools'

const { Title } = Typography

const Home: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <Info />
        <div className="pools">
          <div className="title">
            <Title level={3}>SDF/Pools</Title>
          </div>
          <Pools />
        </div>
      </div>
      <style jsx>{`
        .container {
          width: ${theme['@container-width']};
          margin: 65px auto 0 auto;
        }

        .title {
          margin: 80px 0 40px 0;
        }

        @media screen and (max-width: 736px) {
          .container {
            width: 100%;
            margin: 20px auto;
          }

          .pools {
            padding: 30px 20px;
            margin: 30px 0;
            border-radius: 24px;

            background-color: #fbfbfb;
          }

          .title {
            margin: 0;
            text-indent: 10px;
          }
          .title :global(.ant-typography) {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  )
}

export default Home
