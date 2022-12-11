import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import Note from './index'

const NoteList = ({
  notes,
  setNotes,
  setNotification,
  startIndex,
  setStartIndex,
  LIMIT,
  noteCount
}) => {
  const [activePage, setActivePage] = useState(1)

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
          notes={notes}
          setNotes={setNotes}
          setNotification={setNotification}
          setStartIndex={setStartIndex}
        />
      )
    })
  }

  const updatePagination = async (newStartIndex) => {
    if (newStartIndex < 0) {
      setStartIndex(0)
    } else {
      setStartIndex(newStartIndex)
    }
  }

  return (
    <>
      {mapNotes(notes)}
      <Pagination className="justify-content-center mt-2">
        <Pagination.Prev
          disabled={startIndex <= 0}
          onClick={() => updatePagination(startIndex - LIMIT)}
        ></Pagination.Prev>
        <Pagination.Item>
          {startIndex + 1}-{startIndex + notes.length}/{noteCount}
        </Pagination.Item>
        <Pagination.Next
          disabled={startIndex + LIMIT >= noteCount}
          onClick={() => updatePagination(startIndex + LIMIT)}
        ></Pagination.Next>
      </Pagination>
    </>
  )
}

export default NoteList
