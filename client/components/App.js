import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NoteList from './Note/List'
import NotePushForm from './Note/PushForm'
import HashtagList from './Hashtag/List'
import Notification from './Notification'
import Refresher from './Refresher'
import MPagination from './MPagination'

import { updateHashtags } from '../utils'
import noteservice from '../noteservice'
import fileservice from '../fileservice'

const bgColors = [
  'lightblue',
  'lightgreen',
  'lightpink',
  'plum',
  'lightgrey',
  'wheat',
  'darkseagreen'
]

const LIMIT = 10

const App = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)
  const [hashtags, setHashtags] = useState([])
  const [selectedHts, setSelectedHts] = useState([])
  const [notesVisible, setNotesVisible] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [totalNoteCount, settotalNoteCount] = useState(0)

  const fetchNotes = async () => {
    const notedata = await noteservice.getNotes({
      startIndex: startIndex,
      limit: LIMIT
    })
    const totalNoteCount = await noteservice.getCount()
    const promises = notedata.map(async (note) =>
      fileservice.getNotesFiles(note.noteid)
    )
    const files = await Promise.all(promises)
    const noteswithfiles = notedata.map((n, index) => {
      n.files = files[index].map((file) => file.filename)
      return n
    })
    setNotes(noteswithfiles)
    settotalNoteCount(totalNoteCount)
  }

  useEffect(() => {
    // the mounted hook
    fetchNotes()
    const orig = document.body.className
    document.body.style.backgroundColor =
      bgColors[Math.floor(Math.random() * bgColors.length)]
    return () => {
      document.body.className = orig
    }
  }, [])

  useEffect(() => {
    // check that pagination is within limits
    if (startIndex < 0) {
      // this allows us to "force run" update with startIndex -1 for example
      setStartIndex(0)
      return
    }
    fetchNotes()
  }, [startIndex])

  // effect-hook updates hashtags every time notes change
  useEffect(() => {
    updateHashtags(notes, setHashtags)
  }, [notes])

  // effect-hook updates selectedhashtags every time notes change, hashtags that
  // disappeared will be removed from the selected hashtags list
  useEffect(() => {
    setSelectedHts(
      selectedHts.filter((sh) => hashtags.map((ht) => ht.name).includes(sh))
    )
  }, [hashtags])

  // effect-hook filters shown notes every time selected hashtags change
  useEffect(() => {
    const sn = notes.filter((n) => {
      // find hastags for this note
      const hts = hashtags.filter((ht) => ht.linksto === n.noteid)

      // get the noteid from the raw hashtags (technical function)
      const htNames = hts.map((ht) => ht.name)

      // go through selected hts and collect matching to found hts
      const foundHts = selectedHts.filter((sHt) => {
        return htNames.includes(sHt)
      })

      return selectedHts.length === foundHts.length
    })

    setNotesVisible(sn)
  }, [selectedHts])

  return (
    <Container>
      <Notification setNotification={setNotification}>
        {notification}
      </Notification>
      <Row>
        <Col>
          <h1>meerkat</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Refresher getterFcn={fetchNotes} interval={15000} />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <NotePushForm
            setNotification={setNotification}
            setStartIndex={setStartIndex}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <HashtagList
            hashtags={hashtags}
            selectedHts={selectedHts}
            setSelectedHts={setSelectedHts}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <NoteList
            notes={notes}
            setNotes={setNotes}
            setNotification={setNotification}
            setStartIndex={setStartIndex}
          />
          <MPagination
            noteCount={notes.length}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            LIMIT={LIMIT}
            totalNoteCount={totalNoteCount}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
