import React, { FC } from 'react'
import { Layout, Space, Typography, Button } from 'antd'
import { FieldTimeOutlined } from '@ant-design/icons'
import ButtonOne from '../buttons/ButtonOne'
import {Link} from 'react-router-dom'
import './header.css'
import { Paths } from '../../routes/paths.ts'

const Header: FC = () => {
  return (
    <Layout.Header className='layoutHeader' >
      <Space>
        <FieldTimeOutlined className='teamIcon' />
        <Link to={Paths.home}>
          <ButtonOne type='ghost'>
            <Typography.Title level={2} className='water'>Water Database</Typography.Title>
          </ButtonOne>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.login}>
         <ButtonOne type='ghost'>
           Logout
         </ButtonOne>
        </Link>
      </Space>
    </Layout.Header>
  )
}

export default Header