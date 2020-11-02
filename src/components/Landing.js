import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Collapse from 'react-bootstrap/Collapse'

import authService from './../services/authService'

import meerkat from '../images/meerkat.png'

const Landing = () => {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [registerSuccesful, setRegisterSuccesful] = useState(false)

  const onRegister = (e) => {
    e.preventDefault()
    const registerCredentials = { email, passwd }
    const response = authService.newUser(registerCredentials)
    response
      .then((data) => {
        console.log('Register succesful.')
        setRegisterSuccesful(true)
        setShowForm(false)
      })
      .catch((err) => console.log(err))
  }

  const onChangePassword = (event) => {
    setPasswd(event.target.value)
  }

  const onChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const renderRegisterButton = () => {
    if (registerSuccesful) {
      return (
        <strong>
          Thank you for register! Hop in the App from the top right corner!
        </strong>
      )
    }
    return (
      <Button variant="primary" onClick={() => setShowForm(!showForm)}>
        Register
      </Button>
    )
  }

  const renderRegisterForm = () => {
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
        <br />
        <img src={meerkat} alt="this is a meerkat" />
      </Form>
    )
  }

  return (
    <>
      <Jumbotron>
        <h1>Say hello to meerkat!</h1>
        <p>
          Ever forgotten something? Ever wanting to write down a thought? Now
          it's possible and easier than ever.
        </p>
        <p>
          Register, write down notes and filter them with hashtags. Supported on
          all devices with a modern browser. This means pretty much everything
          except your toaster.
        </p>
        <p>{renderRegisterButton()}</p>
        <Collapse in={showForm}>{renderRegisterForm()}</Collapse>
      </Jumbotron>
    </>
  )
}

export default Landing
