import React, { useState } from 'react'
import noteservice from '../../noteservice'
import fileservice from '../../fileservice'
import FileInput from '../FileInput'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NotePushForm = ({ notes, setNotes, setNotification }) => {
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
        //const response = await fileservice.post(uploadFiles, noteid)
        const addedFiles = await Promise.all(responses)
        updateUploadFiles([])
        addedentry.files = addedFiles.map((r) => r.filename)
        const newNotes = notes.concat(addedentry)
        setNotes(newNotes)
        // TODO: error handling here, file could not be uploaded, dont add to entry
      } else {
        addedentry.files = []
        const newNotes = notes.concat(addedentry)
        setNotes(newNotes)
      }
    } catch (err) {
      setNotification(err.message)
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
        <FileInput label={label} updateUploadFiles={updateUploadFiles} />
      </Form.Group>
      <Form.Group controlId="formSubmit">
        <Button size="lg" type="submit">
          Remember
        </Button>
      </Form.Group>
    </Form>
  )
}

export default NotePushForm
