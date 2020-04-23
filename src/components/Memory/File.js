import React from 'react'
import Image from 'react-bootstrap/Image'

const uploaddir = 'uploads'
const previewImageExtensions = ['jpg', 'png', 'jpeg', 'gif']

const MemoryFile = ({children}) => {

  const filedisplay = (c,i) => {
    const filepath = `${uploaddir}/${c}`
    const splitted = filepath.split('.')
    const extension = splitted[splitted.length-1].toLowerCase()


    if (previewImageExtensions.includes(extension)) {
      return (<a href={filepath} key={i}><Image src={filepath} fluid /></a>)
    }
    return (<a href={filepath} key={i}>{c}</a>)
  }

  return (<div className='memfilecontainer'>
            {children.map(filedisplay)}
          </div>)
}

export default MemoryFile
