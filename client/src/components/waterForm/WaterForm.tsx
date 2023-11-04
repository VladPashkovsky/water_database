import React, { CSSProperties, FC } from 'react'
import { Water } from '../../models/types.ts'
import { Button, Card, Form, Space } from 'antd'
import CustomInput from '../customInput/CutomInput'
import ErrorMessage from '../errorMessage/ErrorMessage'
import ButtonOne from '../buttons/ButtonOne'

interface WaterFormProps<T> {
  onFinish: (value: T) => void,
  goBack?: () => void,
  btnText: string,
  title: string,
  error?: string,
  water?: T,
  disabled?: boolean | undefined,
}

const WaterForm: FC<WaterFormProps<Water>> = ({ onFinish, goBack, btnText, title, error, water, disabled }) => {
  return (
    <Card title={title} style={{ width: '30rem', opacity: 0.9 }}>
      <Form name='water_form' onFinish={onFinish} initialValues={water}>
        <CustomInput name='brand' placeholder='Brand' rows={1} />
        <CustomInput name='description' placeholder='Description' rows={5} />
        <CustomInput name='details' placeholder='Details' rows={9} />
        <CustomInput name='price' placeholder='Price' rows={1} />
        <CustomInput name='imageUrl' placeholder='ImageURL' rows={1} />
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ErrorMessage message={error} />
          <ButtonOne onClick={goBack} htmlType='button'
                     style={{ background: '#878a91', color: 'white', width: '80px' }}>
            Back
          </ButtonOne>
          <ButtonOne htmlType='submit'
                     style={{ background: '#1677ff', color: 'white', width: '80px' }}
                     disabled={disabled}
                     >
            {btnText}
          </ButtonOne>
        </Space>
      </Form>
    </Card>
  )
}

export default WaterForm