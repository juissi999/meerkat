import React from 'react'
import Form from 'react-bootstrap/Form'

const FileInput = ({file, setFile}) => {

  const onChange = (event) => {
    setFile(event.target.files[0])
  }

  let l = "Add file"
  if (file !== null ) {
    l = file.name
  }

  return(<Form.File
            id="custom-file"
            label= {l}
            onChange={onChange}
            custom
          />)
  
}

export default FileInput
