import React, { useState } from 'react'
import Note from './index'
import DeleteModal from '../DeleteModal'
import noteservice from '../../noteservice'

let noteToDelete = null

const NoteList = ({ notes, setNotification, setStartIndex, updateData }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const onDeleteNote = (noteid) => {
    noteToDelete = noteid
    setShowDeleteModal(true)
  }

  const onDeleteConfirmed = async () => {
    try {
      await noteservice.del(noteToDelete)
      await updateData()
      setNotification('Note deleted.')
    } catch (err) {
      setNotification(err.message)
    }
  }

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
          onDeleteNote={onDeleteNote}
        />
      )
    })
  }

  return (
    <>
      {showDeleteModal ? (
        <DeleteModal
          setShow={setShowDeleteModal}
          onDeleteConfirmed={onDeleteConfirmed}
        />
      ) : (
        <></>
      )}{' '}
      {mapNotes(notes)}
    </>
  )
}

export default NoteList
