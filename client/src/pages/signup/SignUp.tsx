import React, { FC, useState } from 'react'
import Registration from '../../components/registration/Registration'
import LayoutEnter from '../../components/layoutEnter/LayoutEnter'
import { Paths } from '../../routes/paths.ts'
import { UserData, useRegisterMutation } from '../../services/api.ts'
import { useNavigate, useLocation } from 'react-router-dom'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import {useTransition, animated} from '@react-spring/web'
import { message, notification } from 'antd'


const SignUp: FC = () => {
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputEmailValue, setInputEmailValue] = useState('')
  const [inputPassValue, setInputPassValue] = useState('')
  const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [newUser] = useRegisterMutation()
  const navigate = useNavigate()
  const location = useLocation()
  const [messageApi, contextHolderMessage] = message.useMessage()
  const [messageRegApi, contextHolderRegMessage] = notification.useNotification()

  const transitions = useTransition(location, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: { duration: 500 }
  })

  const errorMessage = (currentError: string) => {
    messageApi.open({
      type: 'error',
      content: currentError,
      key: 'error'
    })
  }

  const addedNotification = () => {
    messageRegApi.open({
      message: 'DONE!',
      description: 'Sign In, please',
      className: 'signup',
      placement: 'top',
      style: {
        width: 300,
        textAlign: 'center',
        whiteSpace: 'pre-line',
        fontWeight: 'bold',
        borderRadius: 10,
      },
      duration: 5
    })
  }

  const navigateBack = () => {
    navigate('/')
  }

  const showNotification = () => {
    setTimeout(addedNotification, 1000)
    setTimeout(navigateBack, 3000)
  }

  const currentUserData = {
    email: inputEmailValue,
    password: inputPassValue,
    name: inputNameValue,
  }

  const sendRegisterData = async (data: UserData) => {
    try {
      // @ts-ignore
      await newUser(currentUserData).unwrap()
      setDisabled(true)
      showNotification()
    } catch (err) {
      const ifError = isErrorWithMessage(err)
      ifError && setError(err.data.message)
      errorMessage(error)
    }
  }

  const linkTo = (e: any) => {
    e.preventDefault()
    navigate(`${Paths.login}`)
  }


  return (transitions((style) =>
    <LayoutEnter>
      {contextHolderRegMessage}
      {contextHolderMessage}
      <animated.div style={style}>
        <Registration
          valueName={inputNameValue}
          onChangeName={(event) => setInputNameValue(event.target.value)}
          valueEmail={inputEmailValue}
          onChangeEmail={(event) => setInputEmailValue(event.target.value)}
          valuePass={inputPassValue}
          onChangePass={(event) => setInputPassValue(event.target.value)}
          linkTo={linkTo}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // @ts-ignore
              sendRegisterData(currentUserData)
            }
          }}
          onClick={sendRegisterData}
          disabled={isDisabled}
        />
      </animated.div>
    </LayoutEnter>
  ))
}

export default SignUp