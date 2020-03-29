import React, {useEffect, useState} from 'react'

import MemoryList from './Memory/List'
import Pushform from './Pushform'
import HashtagList from './Hashtag/List'
import Notification from './Notification'

import {updateHashtags} from '../utils'
import noteservice from '../noteservice'

const App = () => {

  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)
  const [hashtags, setHashtags] = useState([])
  const [selectedHts, setSelectedHts] = useState([])
  
  const getAll = () => {
    noteservice.getAll()
      .then(data => {
        setNotes(data)
      })
  }
  
  useEffect(getAll, [])
  
  // effect-hook updates hashtags every time notes change
  useEffect(() => updateHashtags(notes, setHashtags), [notes])

  return (<>
            <div id={'headline'}><h1>Meerkat</h1>
              <Notification msg={notification} setNotification={setNotification}/>
            </div>
            <Pushform notes={notes} setNotes={setNotes} setNotification={setNotification}/>
            <HashtagList hashtags={hashtags} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>
            <MemoryList notes={notes} setNotes={setNotes} setNotification={setNotification}/>
          </>)
}

export default App
