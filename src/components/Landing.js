import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Landing = () => {

  const dispatch = useDispatch()

  return (<Container>
            <Row>
              <Col>
                <Button onClick={()=>dispatch({type: 'LOGIN'})}>Please login here</Button>
              </Col>
            </Row>
          </Container>
         )
}

export default Landing
