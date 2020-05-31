import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

const FileInput = ({ file, setFile }) => {
  const zerolabel = 'Add file'
  const [label, setLabel] = useState(zerolabel)

  useEffect(() => {
    if (file === null) {
      setLabel(zerolabel)
    } else {
      setLabel(file.name)
    }
  }, [file])

  const onChange = event => {
    const newfile = event.target.files[0]
    // is this next line fix okay?
    event.target.value = null
    if (newfile !== undefined) {
      setFile(newfile)
    }
  }

  return <Form.File id='custom-file' label={label} onChange={onChange} custom />
}

export default FileInput
