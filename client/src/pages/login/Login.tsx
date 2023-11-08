import React, { FC, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SignIn from '../../components/signin/SignIn'
import LayoutEnter from '../../components/layoutEnter/LayoutEnter'
import { Paths } from '../../routes/paths.ts'
import { useLoginMutation, UserDataLogin } from '../../services/api.ts'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import { notification, message } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'
import {useTransition, animated} from '@react-spring/web'


const Login: FC = () => {
  const [inputEmailValue, setInputEmailValue] = useState('')
  const [inputPassValue, setInputPassValue] = useState('')
  const [error, setError] = useState('')
  const [sendLoginUser, loginUserResult] = useLoginMutation()
  const navigate = useNavigate()
  const location = useLocation()


  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: {duration: 500}
  })

  const [api, contextHolder] = notification.useNotification()
  const [messageApi, contextHolderMessage] = message.useMessage()

  useEffect(() => {
    const openNotification = (placement: NotificationPlacement) => {
      api.open({
        message: 'Notification:',
        description: `
          Sign in
          Email: admin@admin.com
          Password: 123456789

          or Sign up as a new user.
          `,
        placement: 'topLeft',
        className: 'custom-class',
        duration: 20,
        style: {
          animationDelay: '1.5s',
          width: 300,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          fontWeight: 'bold',
          borderRadius: 10,
        },
      })
    }
    openNotification('topLeft')
  }, [])

  const errorMessage = (currentError: string) => {
    messageApi.open({
      type: 'error',
      content: currentError,
    })
  }

  const currentUserData = {
    email: inputEmailValue,
    password: inputPassValue,
  }

  const sendLoginData = async (data: UserDataLogin) => {
    try {
      await sendLoginUser(currentUserData).unwrap()
      navigate('/home')
    } catch (err) {
      const ifError = isErrorWithMessage(err)
      ifError && setError(err.data.message)
      errorMessage(error)
    }
  }

  return ( transitions((style) =>
    <LayoutEnter>
      {contextHolder}
      {contextHolderMessage}
      <animated.div style={style}>
        <SignIn
          valueEmail={inputEmailValue}
          onChangeEmail={(event) => setInputEmailValue(event.target.value)}
          valuePass={inputPassValue}
          onChangePass={(event) => setInputPassValue(event.target.value)}
          linkTo={Paths.signup}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendLoginData(currentUserData)
            }
          }}
          onClick={sendLoginData}
        />
      </animated.div>
    </LayoutEnter>
  ))
}

export default Login