import React, { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Paths } from '../../routes/paths.ts'
import './headerTransparent.css'
import { useAppDispatch } from '../../store/hooks.ts'
import { logout } from '../../store/reducers/authSlice.ts'

const HeaderTransparent: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const logOutClick = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/')
  }

  const goHome = () => {
    if (location.pathname !== '/home') {
      navigate(Paths.home)
    }
  }

  return (
    <div id='container_header'>
      <nav>
        <button className='brand' onClick={goHome}>
            <h2>Water Database</h2>
        </button>
        <ul>
          {/*<Link to={Paths.home} style={{ textDecoration: 'none' }}>*/}
          {/*  <li><span> Something </span></li>*/}
          {/*</Link>*/}
          <li onClick={logOutClick}><span>Logout</span></li>
        </ul>
      </nav>
      <section className='sec1'></section>
      {/*<section className='sec2'></section>*/}
    </div>
  )
}

export default HeaderTransparent