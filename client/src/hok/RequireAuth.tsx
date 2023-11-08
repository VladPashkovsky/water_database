import React, { FC, JSX } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks.ts'


interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation()
  const { isActivated } = useAppSelector(state => state.authReducer)

  if (!isActivated) {
    return <Navigate to='/' state={{ from: location }} />
  }

  return (
    <>
      {children}
    </>
  )
}

export default RequireAuth