import React from 'react'

let notificationTimer = null

const Notification = ({msg, setNotification}) => {

  clearTimeout(notificationTimer)
  notificationTimer = setTimeout(()=>{
    setNotification(null)
  }, 3000)

  // render only if there is something to render
  if (msg === null) {
    return null
  }

  return (<div className='notification'>{msg}</div>)
}

export {Notification}
