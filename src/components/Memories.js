import React from 'react'
import Memory from './Memory.js'

const Memories = ({notes, setNotes, setNotification, setHashtags}) => {

  return (<div className={'memory_container'}>
  {notes.map((note, i)=> {return <Memory key={i} note={note} notes={notes} setNotes={setNotes} setNotification={setNotification} setHashtags={setHashtags}/>})}
  </div>
  )
}

export default Memories
