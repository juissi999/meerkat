import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

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

  return (<Container className='fixed-top'>
            <Row>
              <Col>
                <Alert variant={'success'}>{children}</Alert>
              </Col>
            </Row>
          </Container>)
}

export default Notification
