import React, { FC } from 'react'
import './layoutBasic.css'
import HeaderTransparent from '../header_transparent/HeaderTransparent'

type Props = {
  children: React.ReactNode
}

const LayoutBasic: FC<Props> = ({ children }) => {
  return (
    <div className='container_layout'>
      <HeaderTransparent />
      {children}
    </div>
  )
}

export default LayoutBasic