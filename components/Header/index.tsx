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
          width: 1180px;
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

        @media screen and (max-width: 736px) {
          header {
            height: 80px;
          }

          .container {
            width: 100%;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  )
}

export default Header
