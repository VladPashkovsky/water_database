import React, { FC, useState } from 'react'
import LayoutBasic from '../../components/layoutBasic/LayoutBasic'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetWaterByIdQuery, useRemoveWaterMutation } from '../../services/api.ts'
import { useAppSelector } from '../../store/hooks.ts'
import { Descriptions, Modal } from 'antd'
import ButtonOne from '../../components/buttons/ButtonOne'
import './waterPage.css'
import { Paths } from '../../routes/paths.ts'
import ErrorMessage from '../../components/errorMessage/ErrorMessage'
import { message } from 'antd'
import { isErrorWithMessage } from '../../exceptions/isErrorWithMessage.ts'
import { User } from '../../models/types.ts'


const WaterPage: FC = () => {
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const { data } = useGetWaterByIdQuery(params.id || '')
  const [removeWater] = useRemoveWaterMutation()
  const { user } = useAppSelector(state => state.authReducer)
  const [messageApi, contextHolderMessage] = message.useMessage()

  const addedNotification = () => {
    messageApi.open({
      content: 'The water successfully deleted',
      className: 'custom-class',
      duration: 4,
    })
  }

  const goEdit = () => {
    data && navigate(`${Paths.waterEdit}/${data.id}`)
  }

  const goBack = () => {
    navigate(Paths.home)
  }

  const showNotification = () => {
    setTimeout(addedNotification, 1000)
    setTimeout(goBack, 3000)
  }

  const goDelete = async () => {
    try {
      await (data && removeWater(data.id).unwrap())
      setIsModalOpen(false)
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

  const openModal = () => {
    setIsModalOpen(true)
  }

  const onCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <LayoutBasic>
      {contextHolderMessage}
      <div className='waterForm_basic'>
        <div className='waterForm_container'>
          <Descriptions style={{ margin: '20px' }} title='INFORMATION' layout='vertical' bordered>
            <Descriptions.Item label='Water ID:'>{params.id}</Descriptions.Item>
            <Descriptions.Item label='Brand'>{data && data.brand}</Descriptions.Item>
            <Descriptions.Item label='Description'>{data && data.description}</Descriptions.Item>
            <Descriptions.Item label='Details'>{data && data.details}</Descriptions.Item>
            <Descriptions.Item label='Price'>{data && data.price}</Descriptions.Item>
            <Descriptions.Item label='Image'>
              {<img src={data && data.imageUrl} alt='' style={{ height: '30vh' }} />}
            </Descriptions.Item>
            <Descriptions.Item label='User Information:'>
              NAME: {user && user.name} ID: {data && data.userId}
            </Descriptions.Item>
          </Descriptions>
          <div className='buttons_container'>
            <div className='all_buttons'>
              <div>
                <ButtonOne onClick={goBack}>Back</ButtonOne>
              </div>

              {(user && user.id) === (data && data.userId)
                ?
                (<div>
                  <ButtonOne onClick={goEdit}>Edit</ButtonOne>
                </div>)
                :
                (<div>
                  <ButtonOne disabled={true}>Edit</ButtonOne>
                </div>)
              }

              {(user && user.id) === (data && data.userId)
                ?
                <div>
                  <ButtonOne style={{ paddingRight: '8px', paddingLeft: '8px' }}
                             onClick={openModal}>Delete</ButtonOne>
                </div>
                :
                <div>
                  <ButtonOne disabled={true}>Delete</ButtonOne>
                </div>
              }

              <ErrorMessage message={error} />

              <Modal
                title='DELETE'
                open={isModalOpen}
                onOk={goDelete}
                onCancel={onCancel}
                okText='OK'
                cancelText='Cancel'
                style={{ marginTop: '20vh' }}
              >
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: 'auto', fontWeight: 'bold' }}>
                    <p style={{ textAlign: 'center' }}> {`The Water with id:`} </p>
                    <p style={{ textAlign: 'center', fontSize: 'large' }}> {`${data && data.id}`} </p>
                    <p style={{ textAlign: 'center' }}> {`will be deleted`} </p>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </LayoutBasic>
  )
}

export default WaterPage