import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import api from '../services/api'
import authService from './../services/authService'

const AuthBar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.loggedIn)

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const renderLoginForm = () => {
    if (isLoggedIn) {
      return <Button onClick={onLogout}>logout</Button>
    } else {
      return (
        <Form onSubmit={onLogin}>
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={onChangeEmail}
              />
            </Col>
            <Col xs="auto">
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwd}
                onChange={onChangePassword}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )
    }
  }

  const onChangePassword = (event) => {
    setPasswd(event.target.value)
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  const onLogin = (e) => {
    e.preventDefault()
    const loginCredentials = { email, passwd }
    const response = authService.login(loginCredentials)
    //const response = authService.newUser(loginCredentials)
    response
      .then((data) => {
        const token = data.token
        localStorage.setItem('token', token)
        // set token to api instance (it was already started)
        api.defaults.headers.Authorization = `Bearer ${token}`
        dispatch({ type: 'LOGIN' })
      })
      .catch((err) => console.log(err))
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Meerkat</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {renderLoginForm()}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AuthBar
