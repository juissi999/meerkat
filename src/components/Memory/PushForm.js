import React, {useState} from 'react'
import noteservice from '../../noteservice'
import fileservice from '../../fileservice'
import FileInput from '../FileInput'

const MemoryPushForm = ({notes, setNotes, setNotification}) => {

  const [memo, setMemo] = useState('')
  const [file, setFile] = useState(null)

  const newentry = {'text':memo}

  const on_submit = (event) => {
    event.preventDefault()

    // prevent empty input
    if (memo === '') {
      return
    }

    noteservice
      .post(newentry)
      .then(addedentry => {
        const newNotes = notes.concat(addedentry)
        setNotes(newNotes)
        setMemo('')
        setNotification('New entry added!')
        return addedentry.noteid
      })
      .then(noteid => {
        // after note sent succesfully, send file
        if (file !== null) {
          fileservice
            .post(file)
            .then((response)=>{
              console.log(response, noteid)
              //noteservice
              //  .postFile(noteid)
            })
            .then(() => {
              setFile(null)
            })
        }
      })

  }

  const on_change = (event) => {
    setMemo(event.target.value)
  }

  return (<form name='pushform' onSubmit={on_submit}>
            <textarea name='note' value={memo} onChange={on_change}/>
            <FileInput file={file} setFile={setFile}/>
            <button type='submit'>Remember</button>
          </form>)
}

export default MemoryPushForm
