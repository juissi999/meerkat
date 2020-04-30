import React from 'react'
import Note from './index'

const NoteList = ({ notes, setNotes, notesVisible, setNotification }) => {
  const mapNotes = (notelist) => {
    // sort notes, sort process can be customized now
    const sortedNotes = notelist.slice(0)
    sortedNotes.sort((a, b) => {
      return b.date - a.date
    })

    return sortedNotes.map((note, i) =>
      <Note key={note.noteid} note={note} notes={notes} setNotes={setNotes} setNotification={setNotification} />)
  }

  return (
    <>
      {mapNotes(notesVisible)}
    </>
  )
}

export default NoteList
