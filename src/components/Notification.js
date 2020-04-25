import React from 'react'
import Alert from 'react-bootstrap/Alert'

let notificationTimer = null

const Notification = ({children, setNotification}) => {

  clearTimeout(notificationTimer)
  notificationTimer = setTimeout(()=>{
    setNotification(null)
  }, 3000)

  // render only if there is something to render
  if (children === null) {
    return null
  }

  return (<Alert variant={'success'}>{children}</Alert>)
}

export default Notification
