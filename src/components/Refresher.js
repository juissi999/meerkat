import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

// use initiallyOn boolean prop if you want the component to start checked

const Refresher = ({ getterFcn, initiallyOn, interval }) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (initiallyOn) {
      setChecked(true)
    }
  }, [])

  useEffect(() => {
    if (checked) {
      const intv = setInterval(getterFcn, interval)
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
