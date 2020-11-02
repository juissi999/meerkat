import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import authService from './../services/authService'

const Landing = () => {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [showForm, setShowForm] = useState(false)

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

  const renderRegisterForm = () => {
    if (showForm) {
      return (
        <Form onSubmit={onRegister}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
            />
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
      )
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>meerkat</h1>
          <Button variant="primary" onClick={() => setShowForm(!showForm)}>
            Register
          </Button>
          {renderRegisterForm()}
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
