import React from 'react'
import Memory from './index.js'

const MemoryList = ({notes, setNotes, notesVisible, setNotification}) => {

  const mapMemories = () => {
    // make a copy of the array to not reverse original
    return notesVisible.slice(0).reverse().map((note, i) =>
      <Memory key={i} note={note} notes={notes} setNotes={setNotes} setNotification={setNotification}/>)
  }

  return (<>
            {mapMemories()}
          </>)
}

export default MemoryList
