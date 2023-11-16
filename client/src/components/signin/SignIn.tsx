import React, { FC } from 'react'
import './signin.css'

interface SingInProps {
  valueEmail: string,
  valuePass: string,
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangePass: (e: React.ChangeEvent<HTMLInputElement>) => void,
  // linkTo: string | undefined,
  linkTo: (e: any) => void,
  onClick: (data: any) => void
}

const SignIn: FC<SingInProps> = ({ onKeyDown, valueEmail, onChangeEmail, valuePass, onChangePass, linkTo, onClick }) => {
  return (
    <div className='container'>
      <div className='box'>
        {/*<div className='cover'></div>*/}
        <div className='shadow'></div>
        <div className='content'>
          <div className='form' onKeyDown={onKeyDown}>
            <h3 className='logo'><i className='fa-solid fa-key'></i></h3>
            <h2>Sign in</h2>
            <div className='inputBox'>
              <input type='text' required value={valueEmail} onChange={onChangeEmail} />
              <i className='fa-solid fa-square-envelope'></i>
              <span>Email</span>
            </div>
            <div className='inputBox'>
              <input type='password' required value={valuePass} onChange={onChangePass} />
              <i className='fa-solid fa-lock'></i>
              <span>Password</span>
            </div>
            <div className='links'>
              <a href='#'> <i className='fa-solid fa-question'></i> Forgot Password</a>
              <span onClick={linkTo}> <i className='fa-solid fa-user-plus'></i> Sing Up</span>
            </div>
            <div className='inputBox'>
              <input type='submit' value='Sing In' onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn