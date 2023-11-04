import React, { FC, useEffect, useState } from 'react'
import LayoutBasic from '../../components/layoutBasic/LayoutBasic'
import WaterForm from '../../components/waterForm/WaterForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks.ts'
// import { selectUser } from '../../features/auth/authSlice'
import { useAddWaterMutation } from '../../services/api.ts'
import { Water } from '../../models/types.ts'
import { Paths } from '../../routes/paths.ts'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import { message } from 'antd'
import { useTransition, animated } from '@react-spring/web'


const AddWater: FC = () => {
  const [error, setError] = useState('')
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  // const user = useAppSelector(selectUser)
  const { user } = useAppSelector(state => state.authReducer)
  const [addWater] = useAddWaterMutation()
  const [messageApi, contextHolderMessage] = message.useMessage()

  const addedNotification = () => {
    messageApi.open({
      content: 'The water successfully added',
      className: 'custom-class',
      key: 'addwater',
      duration: 4,
    })
  }

  const navigateBack = () => {
    navigate('/home')
  }

  const showNotification = () => {
    setTimeout(addedNotification, 1000)
    setTimeout(navigateBack, 3000)
  }

  const addNewWater = async (data: Water) => {
    try {
      await addWater(data).unwrap()
      setDisabled(true)
      showNotification()
      // navigate(`${Paths.status}/created`)
    } catch (e) {
      const ifError = isErrorWithMessage(e)
      if (ifError) {
        setError(e.data.message)
      } else {
        setError('Unknown error')
      }
    }
  }

  // useEffect(() => {
  //   !user && navigate('/')
  // }, [navigate, user])

  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
    config: { duration: 500 },
  })

  return (transitions((style) =>
    <LayoutBasic>
      {contextHolderMessage}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <animated.div style={style}>
          <WaterForm
            title='Add New WaterPage'
            btnText='Add'
            onFinish={addNewWater}
            goBack={() => navigate('/home')}
            error={error}
            disabled={isDisabled}
          />
        </animated.div>
      </div>
    </LayoutBasic>,
  ))
}

export default AddWater