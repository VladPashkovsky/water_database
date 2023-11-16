import React, { FC } from 'react'
import './registration.css'

interface SingUpProps {
  valueName: string,
  valueEmail: string,
  valuePass: string,
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onClick: (data: any) => void,
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangePass: (e: React.ChangeEvent<HTMLInputElement>) => void,
  linkTo: (e:any) => void,
  disabled?: boolean | undefined,
}

const Registration: FC<SingUpProps> = ({
                                         valueName,
                                         valueEmail,
                                         valuePass,
                                         onChangeName,
                                         onChangeEmail,
                                         onChangePass,
                                         linkTo,
                                         onKeyDown,
                                         onClick,
                                         disabled,
                                       }) => {
  return (
    <div className='container_reg'>
      <div className='box'>
        {/*<div className='cover'></div>*/}
        <div className='shadow'></div>
        <div className='content_reg'>
          <div className='form' onKeyDown={onKeyDown}>
            <h3 className='logo_reg'><i className='fa-solid fa-key'></i></h3>
            <h2>Sign Up</h2>
            <div className='inputBox'>
              <input type='text' required value={valueName} onChange={onChangeName} />
              <i className='fa-solid fa-user'></i>
              <span>Name</span>
            </div>
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
              {/*<a href='#'> <i className='fa-solid fa-question'></i> Forgot Password</a>*/}
              <span onClick={linkTo}> <i className='fa-solid fa-right-to-bracket'></i> Sing In</span>
            </div>
            <div className='inputBox'>
              <input type='submit' value='Sing Up' onClick={onClick} disabled={disabled} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration