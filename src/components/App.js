import React, {useEffect, useState} from 'react'

import MemoryList from './Memory/List'
import MemoryPushForm from './Memory/PushForm'
import HashtagList from './Hashtag/List'
import Notification from './Notification'

import {updateHashtags} from '../utils'
import noteservice from '../noteservice'

const App = () => {

  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)
  const [hashtags, setHashtags] = useState([])
  const [selectedHts, setSelectedHts] = useState([])
  const [notesShow, setNotesShow] = useState([])
  
  const getAll = () => {
    noteservice.getAll()
      .then(data => {
        setNotes(data)
      })
  }
  
  useEffect(getAll, [])
  
  // effect-hook updates hashtags every time notes change
  useEffect(() => updateHashtags(notes, setHashtags), [notes])

  // effect-hook filters shown notes every time selected hashtags change
  // or hashtags are updated (new note, modification etc)
  useEffect(() => {
    const sn = notes.filter((n) => {

      // find hastags for this note
      const hts = hashtags.filter(ht=>ht.linksto===n.noteid)

      // get the noteid from the raw hashtags (technical function)
      const htNames = hts.map((ht)=>ht.name)

      // go through selected hts and collect matching to found hts
      const foundHts = selectedHts.filter(sHt=>{
        return htNames.includes(sHt)
      })

      return selectedHts.length === foundHts.length
    })

    setNotesShow(sn)
  }, [selectedHts, hashtags])

  return (<>
            <div id={'headline'}><h1>Meerkat</h1>
              <Notification msg={notification} setNotification={setNotification}/>
            </div>
            <MemoryPushForm notes={notes} setNotes={setNotes} setNotification={setNotification}/>
            <HashtagList hashtags={hashtags} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>
            <MemoryList notes={notesShow} setNotes={setNotes} setNotification={setNotification}/>
          </>)
}

export default App
