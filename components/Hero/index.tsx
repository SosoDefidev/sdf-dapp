import React from 'react'

const Hero: React.FunctionComponent = () => {
  return (
    <>
      <div>
        <img src="/imgs/hero.png" alt="sdf" />
      </div>
      <style jsx>{`
        div {
          background-color: #fff;
        }
        div > img {
          display: block;
          width: 100%;
          max-width: 1440px;
          min-width: 960px;
          margin: 0 auto;
          user-select: none;
        }
      `}</style>
    </>
  )
}

export default Hero
