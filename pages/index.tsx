import Navbar from '@components/Navbar'
import HomeContainer from '@containers/Home'
import React from 'react'

export const Home: React.FunctionComponent = () => {
  return (
    <>
      <Navbar />
      <HomeContainer />
    </>
  )
}

export default Home
