import React, { FC, useState } from 'react'
import Registration from '../../components/registration/Registration'
import LayoutEnter from '../../components/layoutEnter/LayoutEnter'
import { Paths } from '../../routes/paths.ts'
import { UserData, useRegisterMutation } from '../../services/api.ts'
import { useNavigate } from 'react-router-dom'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import { message, notification } from 'antd'


const SignUp: FC = () => {
  const [inputNameValue, setInputNameValue] = useState('')
  const [inputEmailValue, setInputEmailValue] = useState('')
  const [inputPassValue, setInputPassValue] = useState('')
  const [isDisabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [newUser] = useRegisterMutation()
  const navigate = useNavigate()
  const [messageApi, contextHolderMessage] = message.useMessage()
  const [messageRegApi, contextHolderRegMessage] = notification.useNotification()

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


  return (
    <LayoutEnter>
      {contextHolderRegMessage}
      {contextHolderMessage}
        <Registration
          valueName={inputNameValue}
          onChangeName={(event) => setInputNameValue(event.target.value)}
          valueEmail={inputEmailValue}
          onChangeEmail={(event) => setInputEmailValue(event.target.value)}
          valuePass={inputPassValue}
          onChangePass={(event) => setInputPassValue(event.target.value)}
          linkTo={Paths.login}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // @ts-ignore
              sendRegisterData(currentUserData)
            }
          }}
          onClick={sendRegisterData}
          disabled={isDisabled}
        />
    </LayoutEnter>
  )
}

export default SignUp