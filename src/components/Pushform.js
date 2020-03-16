import React, {useEffect, useState} from 'react'
import noteservice from './noteservice'
import {updateHashtags} from './utils'

const Pushform = ({memo, setMemo, notes, setNotes, setNotification, setHashtags}) => {

  const newentry = {'text':memo}

  const on_submit = (event) => {
    event.preventDefault()

    noteservice
      .post(newentry)
      .then(addedentry => {
        const newNotes = notes.concat(addedentry)
        setNotes(newNotes)
        updateHashtags(newNotes, setHashtags)
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

export {Pushform}
