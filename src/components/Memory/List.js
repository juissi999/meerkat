import React from 'react'
import Memory from './index.js'

const MemoryList = ({notes, setNotes, setNotification}) => {

  const mapMemories = () => {
    return notes.reverse().map((note, i) =>
      <Memory key={i} note={note} notes={notes} setNotes={setNotes} setNotification={setNotification}/>)
  }

  return (<div className={'memory_container'}>
            {mapMemories()}
          </div>)
}

export default MemoryList
