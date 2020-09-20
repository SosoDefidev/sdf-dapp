import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

import Farm from './components/Farm'
import Pools from './components/Pools'

const Stake: React.FunctionComponent = () => {
  const theme = useTheme()

  const [pool, setPool] = React.useState(null)

  return (
    <>
      <div className="container">
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
      <style jsx>{`
        .container {
          width: ${theme['@container-width']};
          margin: 65px auto 0 auto;
        }
      `}</style>
    </>
  )
}

export default Stake
