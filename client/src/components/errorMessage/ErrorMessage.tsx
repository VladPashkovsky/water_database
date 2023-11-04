import { FC } from 'react'
import { Alert } from 'antd'

interface MessageProps {
  message?: string
}

const ErrorMessage: FC<MessageProps> = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <Alert message={message} type='error' />
  )
}

export default ErrorMessage