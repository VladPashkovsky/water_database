import React, { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Result, Row } from 'antd'

const Statuses: Record<string, string> = {
  created: 'WaterPage added',
  updated: 'WaterPage updated',
  deleted: 'WaterPage deleted',
}

const Status: FC = () => {
  const { status } = useParams()

  return (
    <Row align='middle' justify='center' style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'Not found'}
        extra={
          <Button key='dashboard'>
            <Link to='/home'> Back </Link>
          </Button>
        }
      />
    </Row>
  )
}

export default Status