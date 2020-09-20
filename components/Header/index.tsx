import React from 'react'

const Header: React.FunctionComponent = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="logo">
            <img src={require('@/assets/imgs/avatar.png')} alt="sdf" />
            SDF
          </div>
        </div>
      </header>
      <style jsx>{`
        header {
          width: 100%;
          height: 120px;

          background-color: #fff;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 1160px;
          height: 100%;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
        }
        .logo > img {
          width: 36px;
          height: 36px;
          margin-right: 8px;
        }
      `}</style>
    </>
  )
}

export default Header
