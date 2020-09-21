import React from 'react'
import { useWindowSize } from 'react-use'

const viewportContext = React.createContext({ width: 0, height: 0 })

const ViewportProvider: React.FunctionComponent = ({ children }) => {
  const [{ width, height }, setRect] = React.useState({ width: 1920, height: 1080 })
  const { width: w, height: h } = useWindowSize()

  React.useEffect(() => {
    setRect({ width: w, height: h })
  }, [w, h])

  return <viewportContext.Provider value={{ width, height }}>{children}</viewportContext.Provider>
}

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext)

  // identity size
  let size = 'default'
  if (width > 1680) {
    size = 'default'
  } else if (width > 1280) {
    size = 'xlarge'
  } else if (width > 980) {
    size = 'large'
  } else if (width > 736) {
    size = 'medium'
  } else if (width > 480) {
    size = 'small'
  } else {
    size = 'xsmall'
  }

  return { width, height, size }
}

export { ViewportProvider, useViewport }
