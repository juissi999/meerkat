import React, {useState} from 'react'
import noteservice from '../noteservice'

const Pushform = ({notes, setNotes, setNotification}) => {

  const [memo, setMemo] = useState('')

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
    })
  }

  const on_change = (event) => {
    setMemo(event.target.value)
  }

  return (<form name='pushform' onSubmit={on_submit}>
            <textarea name='note' value={memo} onChange={on_change}/>
            <br/>
            <button type='submit'>Remember</button>
          </form>)
}

export default Pushform
