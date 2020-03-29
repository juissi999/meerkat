import React, {useEffect, useState} from 'react'
import noteservice from '../../noteservice'
import DateStr from '../DateStr'
import MemoryStr from './Str'

const Memory = ({note, notes, setNotes, setNotification}) => {

  const [editable, setEditable] = useState(false)
  const [noteStr, setNoteStr] = useState('')

  // set note text to hook so that editing re-renders element
  const hook = () => {
    setNoteStr(note.text)
  }
  useEffect(hook, [])

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
      <div className={'memory'}>
        <DateStr>{datestr}</DateStr>
        <MemoryStr>{noteStr}</MemoryStr>
        <button onClick={onClickUpdate}>edit</button>
        <button onClick={onClickDelete}>delete</button>
      </div>)
    }
}

export default Memory
