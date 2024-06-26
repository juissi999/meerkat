import React, { useState } from 'react'
import noteservice from '../../noteservice'
import fileservice from '../../fileservice'
import FileInput from '../FileInput'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NotePushForm = ({ setNotification, updateData }) => {
  const [memo, setMemo] = useState('')
  const [uploadFiles, setUploadFiles] = useState([])

  // label for fileinput component
  const zerolabel = 'Add files'
  const [label, setLabel] = useState(zerolabel)

  const newentry = { text: memo }

  const onSubmit = async (event) => {
    event.preventDefault()

    // prevent empty input
    if (memo === '') {
      return
    }

    try {
      const addedentry = await noteservice.post(newentry)
      setMemo('')
      setNotification('New entry added!')

      const noteid = addedentry.noteid

      // after note sent succesfully, send file
      if (uploadFiles.length > 0) {
        const responses = [...uploadFiles].map((file) =>
          fileservice.post(file, noteid)
        )
        // upload all files
        await Promise.all(responses)

        // clean filebox
        updateUploadFiles([])

        // TODO: error handling here, file could not be uploaded, dont add to entry
      }
    } catch (err) {
      setNotification(err.message)
    } finally {
      await updateData()
    }
  }

  const onChange = (event) => {
    setMemo(event.target.value)
  }
  // <textarea name='note' value={memo} onChange={on_change}/>

  const updateUploadFiles = (files) => {
    setUploadFiles(files)

    if (files.length === 0) {
      setLabel(zerolabel)
    } else {
      if (files.length === 1) {
        setLabel(files[0].name)
      } else {
        setLabel(files.length.toString() + ' files')
      }
    }
  }

  return (
    <Form name="pushform" onSubmit={onSubmit}>
      <Form.Group controlId="formMemory">
        <Form.Control as="textarea" rows="3" value={memo} onChange={onChange} />
      </Form.Group>
      <Form.Group controlId="formFile">
        <FileInput
          label={label}
          uploadFiles={uploadFiles}
          updateUploadFiles={updateUploadFiles}
        />
      </Form.Group>
      <Form.Group controlId="formSubmit">
        <Button size="lg" variant="dark" type="submit">
          Remember
        </Button>
      </Form.Group>
    </Form>
  )
}

export default NotePushForm
