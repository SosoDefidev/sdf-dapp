import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

import Farm from './components/Farm'
import Pools from './components/Pools'

const Stake: React.FunctionComponent = () => {
  const theme = useTheme()

  const [pool, setPool] = React.useState<any>(null)

  return (
    <>
      <div className="container">
        <div className="content">
          {pool ? (
            <Farm />
          ) : (
            <Pools
              onSelect={() => {
                setPool({})
              }}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          width: ${theme['@container-width']};
          margin: 65px auto 0 auto;
        }

        @media screen and (max-width: 736px) {
          .container {
            width: 100%;
            margin: 20px auto;
          }

          .content {
            padding: 30px 20px;
            margin: 30px 0;
            border-radius: 24px;

            background-color: #fbfbfb;
          }
        }
      `}</style>
    </>
  )
}

export default Stake
