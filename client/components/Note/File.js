import React from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

const uploaddir = 'uploads'
const previewImageExtensions = ['jpg', 'png', 'jpeg', 'gif']

const NoteFile = ({ noteid, children }) => {
  const filedisplay = (c, i) => {
    const filepath = `${uploaddir}/${noteid}/${c}`
    const splitted = filepath.split('.')
    const extension = splitted[splitted.length - 1].toLowerCase()

    if (previewImageExtensions.includes(extension)) {
      return (
        <Card
          border="lightgray"
          style={{ maxWidth: '18rem', padding: '1rem' }}
          key={c}
        >
          <a href={filepath}>
            <Image src={filepath} fluid />
          </a>
        </Card>
      )
    }
    return (
      <Card
        border="lightgray"
        style={{ maxWidth: '18rem', padding: '1rem' }}
        key={c}
      >
        <Card.Link href={filepath}>{c}</Card.Link>
      </Card>
    )
  }

  return <CardColumns>{children.map(filedisplay)}</CardColumns>
}

export default NoteFile
