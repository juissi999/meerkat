import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import noteservice from '../../noteservice'
import NoteFile from './File'

const Note = ({note, notes, setNotes, setNotification}) => {

  const [editable, setEditable] = useState(false)
  const [noteStr, setNoteStr] = useState('')

  const datetxt = (dstring) => {
    return new Date(dstring).toString()
  } 

  const onClickDelete = () => {
    noteservice.del(note.noteid)
      .then(() => {
        const newNotes = notes.filter(n => {
          return n.noteid !== note.noteid
        })
        setNotes(newNotes)
        setNotification(`Note deleted.`)
      })
      .catch(err => setNotification(err.message))
  }

  const onClickEdit = () => {
    noteservice
      .getOne(note.noteid)
      .then((receivedNote) => {
        if (Object.keys(receivedNote).length === 0) {
          setNotification('Note does not exist.')
          setNotes(notes.filter(n =>n.noteid !== note.noteid))
        } else {
          setNoteStr(receivedNote.text)
          setEditable(!editable)
        }
      })
      .catch(err => setNotification(err.message))
  }

  const onChange = (event) => {
    setNoteStr(event.target.value)
  }

  const onPut = (event) => {
    event.preventDefault()

    noteservice
      .update(note.noteid, {text:noteStr})
      .then(() => {
        // note was succesfully updated
        // new noteobject where text is replace on this noteid
        const newNotes = notes.map(n => n.noteid === note.noteid ? {...note, text:noteStr} : n)

        // set it on notes hook
        setNotes(newNotes)

        // set component state
        setEditable(!editable)
        setNotification('Note updated.')
      })
      .catch(err => setNotification(err.message))
  }

  if (editable) {
    return(<Card className='mt-2'>
             <Card.Body>
               <Card.Subtitle className="mb-2 text-muted">{datetxt(note.date)}</Card.Subtitle>
               <Form name='pushform' onSubmit={onPut}>
                 <Form.Group controlId="formNote">
                   <Form.Control as='textarea' name='note' rows='3' value={noteStr} onChange={onChange} />
                   </Form.Group>
                   <Form.Group controlId="formSubmit">
                     <Button type='submit'>Update note</Button>
                   </Form.Group>
                 </Form>
               </Card.Body>
             </Card>)
  } else {
    return (<Card className='mt-2'>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{datetxt(note.date)}</Card.Subtitle>
                <Card.Text>{note.text}</Card.Text>
                <NoteFile>{note.files}</NoteFile>
                <ButtonGroup aria-label="Memory controls" size="sm">
                  <Button variant="secondary" onClick={onClickEdit}>edit</Button>
                  <Button variant="secondary" onClick={onClickDelete}>delete</Button>
                </ButtonGroup>
              </Card.Body>
            </Card>)
    }
}

export default Note
