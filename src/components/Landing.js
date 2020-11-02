import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import api from '../services/api'
import authService from './../services/authService'

const Landing = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [formAction, setFormAction] = useState('login')

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
        // reload here to get the api use newly saved token
        //window.location.reload()
      })
      .catch((err) => console.log(err))
  }

  const onRegister = (e) => {
    e.preventDefault()
    const registerCredentials = { email, passwd }
    const response = authService.newUser(registerCredentials)
    response
      .then((data) => {
        console.log('Register succesful.')
      })
      .catch((err) => console.log(err))
  }

  const onChangePassword = (event) => {
    setPasswd(event.target.value)
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>meerkat</h1>
          <Button
            variant="primary"
            onClick={() =>
              setFormAction(formAction === 'login' ? 'register' : 'login')
            }
          >
            {formAction}
          </Button>
          <Form onSubmit={formAction === 'login' ? onLogin : onRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={onChangeEmail}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwd}
                onChange={onChangePassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
