import React from 'react'

const uploaddir = 'uploads'

const MemoryFile = ({children}) => {

  const filedisplay = (c,i) => {
    const filepath = 'uploads/' + c
    const splitted = filepath.split('.')
    const extension = splitted[splitted.length-1].toLowerCase()
    console.log(extension)
    //<img src={filepath}></img>

    if (extension === 'jpg' || extension === 'png') {
      return (<a href={filepath} key={i}><img src={filepath} className='memoryimage'></img></a>)
    }
    return (<a href={filepath} key={i}>{c}</a>)
  }

  return (<div className='memfilecontainer'>
            {children.map(filedisplay)}
          </div>)
}

export default MemoryFile
