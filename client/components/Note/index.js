import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import noteservice from '../../noteservice'
import fileservice from '../../fileservice'
import NoteFile from './File'

const Note = ({ note, setNotification, updateData, onDeleteNote }) => {
  const [editable, setEditable] = useState(false)
  const [noteStr, setNoteStr] = useState('')
  const [editableFiles, setEditableFiles] = useState([])

  const datetxt = (dstring) => {
    const dateObj = new Date(dstring)
    return (
      dateObj.toISOString().slice(0, 10) +
      ' at ' +
      ('0' + dateObj.getHours()).slice(-2) +
      ':' +
      ('0' + dateObj.getMinutes()).slice(-2)
    )
  }

  const onClickDeleteNote = () => {
    onDeleteNote(note.noteid)
  }

  const onClickEdit = async () => {
    try {
      const receivedNote = await noteservice.getOne(note.noteid)
      const receivedFiles = await fileservice.getNotesFiles(note.noteid)
      if (Object.keys(receivedNote).length === 0) {
        setNotification('Note does not exist.')
        await updateData()
      } else {
        setNoteStr(receivedNote.text)

        setEditableFiles(receivedFiles.map((file) => file.filename))
        setEditable(!editable)
      }
    } catch (err) {
      setNotification(err.message)
    }
  }

  const onChange = (event) => {
    setNoteStr(event.target.value)
  }

  const onCancel = () => {
    setEditable(!editable)
  }

  const onDeleteFile = async (filename) => {
    await fileservice.deleteFile(note.noteid, filename)
    setEditableFiles(editableFiles.filter((file) => file !== filename))
  }

  const onUpdateNote = async (event) => {
    event.preventDefault()

    try {
      await noteservice.update(note.noteid, { text: noteStr })
      // note was succesfully updated
      // signal upwards that notes were updated
      updateData()

      // set component state
      setEditable(!editable)
      setNotification('Note updated.')
    } catch (err) {
      // something went wrong in note update
      setNotification(err.message)
    }
  }

  if (editable) {
    return (
      <Card className="mt-2">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {datetxt(note.date)}
          </Card.Subtitle>
          <Form name="pushform" onSubmit={onUpdateNote}>
            <Form.Group controlId="formNote">
              <Form.Control
                as="textarea"
                name="note"
                rows="3"
                value={noteStr}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="formFilelist">
              {editableFiles.map((file) => (
                <Form.Row key={file} className="my-1">
                  {file}
                  <Button
                    variant="danger"
                    className="mx-1"
                    onClick={() => onDeleteFile(file)}
                  >
                    X
                  </Button>
                </Form.Row>
              ))}
            </Form.Group>
            <Form.Group controlId="formSubmit">
              <Button type="submit" variant="dark">
                Update note
              </Button>{' '}
              <Button onClick={onCancel} variant="secondary">
                Cancel
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    )
  } else {
    return (
      <Card className="mt-2">
        <Card.Body>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{note.text}</Card.Text>
          <NoteFile noteid={note.noteid}>{note.files}</NoteFile>
          <ButtonToolbar
            className="justify-content-between"
            aria-label="Toolbar with Button groups"
          >
            <div class="mr-2 font-weight-light text-muted">
              {datetxt(note.date)}
            </div>

            <ButtonGroup aria-label="Memory controls" size="sm">
              <Button variant="outline-secondary" onClick={onClickEdit}>
                edit
              </Button>
              <Button variant="outline-secondary" onClick={onClickDeleteNote}>
                delete
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    )
  }
}

export default Note
