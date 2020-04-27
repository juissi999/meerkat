import React from 'react'
import Note from './index'

const NoteList = ({notes, setNotes, notesVisible, setNotification}) => {

  const mapMemories = () => {
    // make a copy of the array to not reverse original
    return notesVisible.slice(0).reverse().map((note, i) =>
      <Note key={i} note={note} notes={notes} setNotes={setNotes} setNotification={setNotification}/>)
  }

  return (<>
            {mapMemories()}
          </>)
}

export default NoteList
