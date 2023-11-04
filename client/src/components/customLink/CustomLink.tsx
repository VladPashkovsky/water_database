import React, { FC } from 'react'
import { Link, useMatch } from 'react-router-dom'

interface CustomLink {
  children: React.ReactNode,
  to:  string;
}

const CustomLink: FC<CustomLink> = ({ children, to, ...props }) => {
  const match = useMatch({ path: to, end: to.length === 1 })
  return (
    <Link to={to} {...props} style={{ color: match ? 'var(--color-active)' : 'none' }}>
      {children}
    </Link>
  )
}

export { CustomLink }