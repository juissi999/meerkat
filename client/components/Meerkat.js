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

const Meerkat = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)
  const [hashtags, setHashtags] = useState([])
  const [selectedHts, setSelectedHts] = useState([])
  // const [notesVisible, setNotesVisible] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [totalNoteCount, settotalNoteCount] = useState(0)

  const fetchNotes = async () => {
    const notedata = await noteservice.getNotes(
      {
        startIndex: startIndex,
        limit: LIMIT
      },
      selectedHts
    )
    const totalNoteCount = await noteservice.getCount(selectedHts)

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

  const fetchHashtags = async () => {
    const hashtags = await noteservice.getHashtags()
    setHashtags(hashtags)
  }

  const updateData = async () => {
    await fetchNotes()
    await fetchHashtags()
  }

  useEffect(() => {
    // the mounted hook
    fetchNotes()
    fetchHashtags()
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

  // effect-hook filters shown notes every time selected hashtags change
  useEffect(() => {
    fetchNotes()
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
            updateData={updateData}
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
            updateData={updateData}
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

export default Meerkat
