import Button, { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useWallet } from 'use-wallet'

import { useApp } from '@/shared/providers/AppProvider'

const EnableButton: React.FunctionComponent<ButtonProps> = ({ ...props }) => {
  const { account } = useApp()
  const wallet = useWallet()
  const [loading, setLoading] = React.useState(false)

  let text: React.ReactNode
  if (account) {
    text = props.children
  } else {
    text = loading ? 'Connecting' : 'Connect wallet'
  }

  let onClick
  if (account) {
    onClick = props.onClick
  } else {
    onClick = () => {
      setLoading(true)
      wallet.connect('injected').finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <Button {...props} loading={account ? props.loading : loading} onClick={onClick}>
      {text}
    </Button>
  )
}

export default EnableButton
