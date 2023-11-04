import React, { FC } from 'react'
import './layoutEnter.css'

type Props = {
  children: React.ReactNode
}

const LayoutEnter: FC<Props> = ({children}) => {
  return (
    <div className='container_layout_enter'>
      {children}
    </div>
  )
}

export default LayoutEnter