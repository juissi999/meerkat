import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

const FileInput = ({ label, updateUploadFiles }) => {
  const onChange = (event) => {
    const filesToUpload = event.target.files
    // is this next line fix okay?
    //event.target.value = null
    if (filesToUpload !== undefined) {
      updateUploadFiles(filesToUpload)
    }
  }

  return (
    <Form.File
      id="custom-file"
      label={label}
      onChange={onChange}
      custom
      multiple
    />
  )
}

export default FileInput
