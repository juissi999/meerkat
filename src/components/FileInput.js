import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const FileInput = ({ label, uploadFiles, updateUploadFiles }) => {
  const onChange = (event) => {
    const filesToUpload = event.target.files
    // is this next line fix okay?
    //event.target.value = null
    if (filesToUpload !== undefined) {
      updateUploadFiles(filesToUpload)
    }
  }

  return (
    <>
      <Form.File
        id="custom-file"
        label={label}
        onChange={onChange}
        className="mb-1"
        custom
        multiple
      />
      {uploadFiles.length > 0 && (
        <Button
          size="xs"
          variant="warning"
          onClick={() => updateUploadFiles([])}
        >
          Clear files
        </Button>
      )}
    </>
  )
}

export default FileInput
