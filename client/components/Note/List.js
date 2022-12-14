import React, { useState } from 'react'
import Note from './index'

const NoteList = ({
  notes,
  setNotes,
  setNotification,
  setStartIndex,
  updateData
}) => {
  const mapNotes = (notelist) => {
    // sort notes, sort process can be customized now
    const sortedNotes = notelist.slice(0)
    // sortedNotes.sort((a, b) => {
    //   return new Date(b.date) - new Date(a.date)
    // })

    return sortedNotes.map((note, i) => {
      return (
        <Note
          key={note.noteid}
          note={note}
          updateData={updateData}
          setNotification={setNotification}
          setStartIndex={setStartIndex}
        />
      )
    })
  }

  return <>{mapNotes(notes)}</>
}

export default NoteList
