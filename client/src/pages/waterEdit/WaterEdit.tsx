import React, { FC, useState } from 'react'
import LayoutBasic from '../../components/layoutBasic/LayoutBasic'
import WaterForm from '../../components/waterForm/WaterForm'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEditWaterMutation, useGetWaterByIdQuery } from '../../services/api.ts'
import { Water } from '../../models/types.ts'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import { message } from 'antd'
import { useTransition, animated } from '@react-spring/web'


const WaterEdit: FC = () => {
  const [error, setError] = useState('')
  const [isDisabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ id: string }>()
  const {data} = useGetWaterByIdQuery(params.id || '')
  const [editWater] = useEditWaterMutation()
  const [messageApi, contextHolderMessage] = message.useMessage()

  const addedNotification = () => {
    messageApi.open({
      content: 'The water successfully edited',
      className: 'custom-class',
      duration: 4,
    })
  }

  const navigateBack = () => {
    navigate(-1)
  }

  const showNotification = () => {
    setTimeout(addedNotification, 1000)
    setTimeout(navigateBack, 3000)
  }

  const editThisWater = async (currentData: Water) => {
    try {
      const editCurrentWater = {...data, ...currentData}
      await editWater(editCurrentWater).unwrap()
      setDisabled(true)
      showNotification()
    } catch (e) {
      const ifError = isErrorWithMessage(e)
      if (ifError) {
        setError(e.data.message)
      } else {
        setError('Unknown error')
      }
    }
  }

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
            title={`Edit Water ID: ${data && data.id}`}
            water={data}
            btnText='Edit'
            onFinish={editThisWater}
            goBack={navigateBack}
            error={error}
            disabled={isDisabled}
          />
        </animated.div>
      </div>
    </LayoutBasic>,
  ))
}

export default WaterEdit