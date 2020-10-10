import { Modal, Progress, Typography } from 'antd'
import React from 'react'
import { useInterval } from 'react-use'

interface Props {
  progress: number
}

const { Title } = Typography

const Loading: React.FunctionComponent<Props> = ({ progress }) => {
  const [percent, setPercent] = React.useState(0)

  useInterval(
    () => {
      percent === 99 ? setPercent(99) : setPercent(percent + 1)
      if (percent < 99) {
        setPercent(percent + 1)
      }
    },
    percent > 50 ? (percent > 90 ? 1000 : 200) : 150
  )

  React.useEffect(() => {
    setPercent(progress)
  }, [progress])

  return (
    <Modal
      title={null}
      footer={null}
      visible={true}
      closable={false}
      width={300}
      bodyStyle={{ textAlign: 'center' }}>
      <Title level={3}>Transaction pending</Title>
      <Progress percent={percent} type="circle" />
    </Modal>
  )
}

export default Loading
