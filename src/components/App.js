import React, {useEffect, useState} from 'react'

import Memories from './Memories'
import Pushform from './Pushform'
import Hashtags from './Hashtags'
import Notification from './Notification'

import {updateHashtags} from '../utils'
import noteservice from '../noteservice'

const App = () => {

  const [notes, setNotes] = useState([])
  const [memo, setMemo] = useState('')
  const [notification, setNotification] = useState(null)
  const [hashtags, setHashtags] = useState([])
  const [selectedHts, setSelectedHts] = useState([])
  
  const getAll = () => {
    noteservice.getAll()
      .then(data => {
        updateHashtags(data, setHashtags)
        setNotes(data)
      })
  }
  
  useEffect(getAll, [])
  
  return (<>
            <div id={'headline'}><h1>Meerkat</h1>
              <Notification msg={notification} setNotification={setNotification}/>
            </div>
            <Pushform notes={notes} setNotes={setNotes} memo={memo} setMemo={setMemo} setNotification={setNotification} setHashtags={setHashtags}/>
            <Hashtags hashtags={hashtags} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>
            <Memories notes={notes} setNotes={setNotes} setNotification={setNotification} setHashtags={setHashtags}/>
          </>)
}

export default App
