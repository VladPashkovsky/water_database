import React, { FC, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SignIn from '../../components/signin/SignIn'
import LayoutEnter from '../../components/layoutEnter/LayoutEnter'
import { Paths } from '../../routes/paths.ts'
import { useLoginMutation, UserDataLogin } from '../../services/api.ts'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import { message } from 'antd'
import {useTransition, animated, useSpring} from '@react-spring/web'
import NotificationEnter from '../../components/notificationEnter/NotificationEnter.tsx'


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
    config: { duration: 500 }
  })

  const notificationProp = useSpring({
    x: 0,
    from: {x: -300},
    delay: 1500
  })


  const [messageApi, contextHolderMessage] = message.useMessage()

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

  const linkTo = (e: any) => {
    e.preventDefault()
    navigate(`${Paths.signup}`)
  }

  return (transitions((style) =>
    <LayoutEnter>
      {contextHolderMessage}
      <animated.div style={notificationProp}>
        <NotificationEnter />
      </animated.div>
      <animated.div style={style}>
        <SignIn
          valueEmail={inputEmailValue}
          onChangeEmail={(event) => setInputEmailValue(event.target.value)}
          valuePass={inputPassValue}
          onChangePass={(event) => setInputPassValue(event.target.value)}
          linkTo={linkTo}
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