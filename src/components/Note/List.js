import React, { useState } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import Note from './index'

const itemsInPage = 15

const NoteList = ({ notes, setNotes, notesVisible, setNotification }) => {
  const [activePage, setActivePage] = useState(1)

  const mapNotes = notelist => {
    // sort notes, sort process can be customized now
    const sortedNotes = notelist.slice(0)
    sortedNotes.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })

    return sortedNotes.map((note, i) => {
      if (Math.floor(i / itemsInPage) === activePage - 1) {
        return (
          <Note
            key={note.noteid}
            note={note}
            notes={notes}
            setNotes={setNotes}
            setNotification={setNotification}
          />
        )
      }
    })
  }
  const onPaginationClick = id => {
    if (id !== activePage) setActivePage(id)
  }

  const createPagination = notelist => {
    const items = []

    for (let i = 1; i < notelist.length / itemsInPage + 1; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => onPaginationClick(i)}
        >
          {i}
        </Pagination.Item>
      )
    }
    return items
  }

  return (
    <>
      <Pagination className='justify-content-md-center mb-0'>
        {createPagination(notesVisible)}
      </Pagination>
      {mapNotes(notesVisible)}
      <Pagination className='justify-content-md-center mt-2'>
        {createPagination(notesVisible)}
      </Pagination>
    </>
  )
}

export default NoteList
