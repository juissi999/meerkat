import React from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'

const uploaddir = 'uploads'
const previewImageExtensions = ['jpg', 'png', 'jpeg', 'gif']

const NoteFile = ({ children }) => {
  const filedisplay = (c, i) => {
    const filepath = `${uploaddir}/${c}`
    const splitted = filepath.split('.')
    const extension = splitted[splitted.length - 1].toLowerCase()

    if (previewImageExtensions.includes(extension)) {
      return (
        <a href={filepath} key={c}>
          <Image src={filepath} fluid />
        </a>
      )
    }
    return (
      <Card.Link key={c} href={filepath}>
        {c}
      </Card.Link>
    )
  }

  return <Card.Text>{children.map(filedisplay)}</Card.Text>
}

export default NoteFile
