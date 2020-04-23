import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'

import noteservice from '../../noteservice'
import MemoryFile from './File'

const Memory = ({note, notes, setNotes, setNotification}) => {

  const [editable, setEditable] = useState(false)
  const [noteStr, setNoteStr] = useState('')

  // set note text to hook so that editing re-renders element
  useEffect(()=>setNoteStr(note.text), [note])

  const datestr = new Date(note.date).toString()

  const onClickDelete = () => {
    noteservice.del(note.noteid)
      .then(() => {
        const newNotes = notes.filter(n => {
          return n.noteid !== note.noteid
        })
        setNotes(newNotes)
        setNotification(`Note deleted.`)
      })
  }

  const onClickUpdate = () => {
    setEditable(!editable)
  }

  const onChange = (event) => {
    setNoteStr(event.target.value)
  }

  const onPut = () => {
    noteservice
      .update(note.noteid, {text:noteStr})
      .then(() => {
        // note was succesfully updated
        // new noteobject where text is replace on this noteid
        const newNotes = notes.map(n=>n.noteid===note.noteid?{...note, text:noteStr}:n)

        // set it on notes hook
        setNotes(newNotes)

        // set component state
        setEditable(!editable)
        setNotification(`Note updated.`)
      })
  }

  if (editable) {
    return(<div className={'memory'}>
      <form name='pushform' onSubmit={onPut}>
          <textarea name='note' value={noteStr} onChange={onChange}/>
      </form>
      <button onClick={onPut}>ok</button>
    </div>)
  } else {
    return (
      <Card className='mt-2'>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{datestr}</Card.Subtitle>
          <Card.Text>{noteStr}</Card.Text>
          <MemoryFile>{note.files}</MemoryFile>
          <ButtonGroup aria-label="Memory controls" size="sm">
            <Button variant="secondary" onClick={onClickUpdate}>edit</Button>
            <Button variant="secondary" onClick={onClickDelete}>delete</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>)
    }
}

export default Memory
