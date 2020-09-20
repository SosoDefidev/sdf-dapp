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
        <div className="title">
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

        .container .title {
          margin: 80px 0 40px 0;
        }
      `}</style>
    </>
  )
}

export default Home
