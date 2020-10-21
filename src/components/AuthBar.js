import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const AuthBar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.loggedIn)

  const renderLoginForm = () => {
    if (isLoggedIn) {
      return <Button onClick={onLogout}>logout</Button>
    }
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Meerkat {isLoggedIn}</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {renderLoginForm()}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AuthBar
