import React, { FC } from 'react'
import './notificationEnter.css'

const NotificationEnter: FC = () => {
  function toggleContainer() {
    const toggle = document.getElementById('notificationEnter_container')!
    toggle.classList.toggle('active')
  }

  return (
    <div id='notificationEnter_container'>
      <div className='notification_form'>
        <i className='fa-solid fa-rectangle-xmark' onClick={toggleContainer}></i>
        <div className='notification_text_area'>
          <div>
            <span>Sign in <br /> or Sign up as a new user</span>
          </div>
          <hr />
          <div>
            <span>Email: admin@admin.com</span>
            <br />
            <span>Password: 123456789</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationEnter