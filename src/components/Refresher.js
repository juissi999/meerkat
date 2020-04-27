import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'

const INTERVAL = 5000

const Refresher = ({getterFcn}) => {

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (checked) {
      const intv = setInterval(getterFcn, INTERVAL)
      return ()=>clearInterval(intv)
    }
  }, [checked])

  const onChange = (event) => {
    setChecked(event.target.checked)
  }

  return (<Form>
            <Form.Check 
              onChange={onChange}
              type='checkbox'
              id='refreshCheck'
              label='Automatic refresh'
                  />
          </Form>)
}

export default Refresher
