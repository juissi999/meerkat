import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

const Landing = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const loginCredentials = { email, passwd }
    console.log(loginCredentials)
    dispatch({ type: 'LOGIN', data: loginCredentials })
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
          <Form onSubmit={onSubmit}>
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
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing
