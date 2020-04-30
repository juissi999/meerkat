import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

const INTERVAL = 5000
const INITIAL_STATE = true

const Refresher = ({ getterFcn }) => {
  const [checked, setChecked] = useState(INITIAL_STATE)

  useEffect(() => {
    if (checked) {
      const intv = setInterval(getterFcn, INTERVAL)
      return () => clearInterval(intv)
    }
  }, [checked])

  const onChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <Form>
      <Form.Check
        onChange={onChange}
        checked={checked}
        type='checkbox'
        id='refreshCheck'
        label='Automatic refresh'
      />
    </Form>
  )
}

export default Refresher
