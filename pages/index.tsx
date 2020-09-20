import React from 'react'

import Navbar from '@/components/Navbar'
import HomeContainer from '@/containers/Home'

export const Home: React.FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <HomeContainer />
    </>
  )
}

export default Home
