import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import noteservice from '../../noteservice'
import fileservice from '../../fileservice'
import NoteFile from './File'

const Note = ({ note, notes, setNotes, setNotification, setStartIndex }) => {
  const [editable, setEditable] = useState(false)
  const [noteStr, setNoteStr] = useState('')
  const [editableFiles, setEditableFiles] = useState([])

  const datetxt = (dstring) => {
    return new Date(dstring).toString()
  }

  const onClickDelete = async () => {
    try {
      await noteservice.del(note.noteid)
      setStartIndex(-1)
      setNotification('Note deleted.')
    } catch (err) {
      setNotification(err.message)
    }
  }

  const onClickEdit = async () => {
    try {
      const receivedNote = await noteservice.getOne(note.noteid)
      const receivedFiles = await fileservice.getNotesFiles(note.noteid)
      if (Object.keys(receivedNote).length === 0) {
        setNotification('Note does not exist.')
        setNotes(notes.filter((n) => n.noteid !== note.noteid))
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

  const onPut = async (event) => {
    event.preventDefault()

    try {
      await noteservice.update(note.noteid, { text: noteStr })
      const receivedFiles = await fileservice.getNotesFiles(note.noteid)

      // note was succesfully updated
      // new noteobject where text is replace on this noteid
      // and files replaced with what is in backend now
      const newNotes = notes.map((n) =>
        n.noteid === note.noteid
          ? {
              ...note,
              text: noteStr,
              files: receivedFiles.map((f) => f.filename)
            }
          : n
      )

      // set it on notes hook
      setNotes(newNotes)

      // set component state
      setEditable(!editable)
      setNotification('Note updated.')
    } catch (err) {
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
          <Form name="pushform" onSubmit={onPut}>
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
              <Button type="submit">Update note</Button>{' '}
              <Button onClick={onCancel}>Cancel</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    )
  } else {
    return (
      <Card className="mt-2">
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {datetxt(note.date)}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{note.text}</Card.Text>
          <NoteFile>{note.files}</NoteFile>
          <ButtonGroup aria-label="Memory controls" size="sm">
            <Button variant="secondary" onClick={onClickEdit}>
              edit
            </Button>
            <Button variant="secondary" onClick={onClickDelete}>
              delete
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    )
  }
}

export default Note
