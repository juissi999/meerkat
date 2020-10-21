import React, { useState } from 'react'
import noteservice from '../../services/noteservice'
import fileservice from '../../services/fileservice'
import FileInput from '../FileInput'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const NotePushForm = ({ notes, setNotes, setNotification }) => {
  const [memo, setMemo] = useState('')
  const [file, setFile] = useState(null)

  const newentry = { text: memo }

  const onSubmit = event => {
    event.preventDefault()

    // prevent empty input
    if (memo === '') {
      return
    }

    noteservice
      .post(newentry)
      .then(addedentry => {
        setMemo('')
        setNotification('New entry added!')
        return addedentry
      })
      .then(addedentry => {
        const noteid = addedentry.noteid

        // after note sent succesfully, send file
        if (file !== null) {
          fileservice.post(file, noteid).then(response => {
            setFile(null)
            // console.log(response, noteid)
            addedentry.files = [response.filename]
            const newNotes = notes.concat(addedentry)
            setNotes(newNotes)
          })
        } else {
          addedentry.files = []
          const newNotes = notes.concat(addedentry)
          setNotes(newNotes)
        }
      })
  }

  const onChange = event => {
    setMemo(event.target.value)
  }
  // <textarea name='note' value={memo} onChange={on_change}/>

  return (
    <Form name='pushform' onSubmit={onSubmit}>
      <Form.Group controlId='formMemory'>
        <Form.Control as='textarea' rows='3' value={memo} onChange={onChange} />
      </Form.Group>
      <Form.Group controlId='formFile'>
        <FileInput file={file} setFile={setFile} />
      </Form.Group>
      <Form.Group controlId='formSubmit'>
        <Button size='lg' type='submit'>
          Remember
        </Button>
      </Form.Group>
    </Form>
  )
}

export default NotePushForm
