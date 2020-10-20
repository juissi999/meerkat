import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const AuthBar = () => {

  const renderLoginForm = (state) => {
    if (state === 'AUTHENTICATED') {
      return <Button>logout</Button>
    }
  }


  return (<Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>Meerkat</Navbar.Brand>
      <Navbar.Collapse className='justify-content-end'>
        {renderLoginForm('AUTHENTICATED')}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AuthBar
