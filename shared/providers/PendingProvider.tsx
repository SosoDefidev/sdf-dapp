import { Modal, Progress, Typography } from 'antd'
import React from 'react'
import { useInterval } from 'react-use'

const { Title } = Typography

const pendingContext = React.createContext<{
  show(text: string): void
  hide(): void
  success(text: string): void
  fail(text: string): void
}>({} as any)

const PendingProvider: React.FunctionComponent = ({ children }) => {
  const [visible, setVisible] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [text, setText] = React.useState<string>()
  const [error, setError] = React.useState<boolean>(false)

  const show = (text: string) => {
    setText(text)
    setProgress(0)

    setVisible(true)
  }

  const hide = () => {
    setVisible(false)

    setError(false)

    setProgress(100)
  }

  const success = (text: string) => {
    setError(false)
    setText(text)
  }

  const fail = (text: string) => {
    setError(true)
    setText(text)

    setProgress(100)
  }

  useInterval(
    () => {
      progress === 99 ? setProgress(99) : setProgress(progress + 1)
      if (progress < 99) {
        setProgress(progress + 1)
      }
    },
    visible ? (progress > 50 ? (progress > 90 ? 2000 : 500) : 300) : 99999999999999
  )

  return (
    <pendingContext.Provider value={{ show, hide, success, fail }}>
      <Modal
        title={null}
        footer={null}
        visible={visible}
        destroyOnClose={true}
        closable={progress === 100}
        width={300}
        onCancel={() => {
          setVisible(false)
          setError(false)
          setProgress(0)
          setText('')
        }}
        bodyStyle={{ textAlign: 'center' }}>
        <Title level={3}>{text}</Title>
        <Progress
          percent={progress}
          type="circle"
          status={progress < 100 ? 'active' : error ? 'exception' : 'success'}
        />
      </Modal>
      {children}
    </pendingContext.Provider>
  )
}

const usePending = () => {
  const context = React.useContext(pendingContext)

  return context
}

export { PendingProvider, usePending }
