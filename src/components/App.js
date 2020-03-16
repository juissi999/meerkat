import React, {useEffect, useState} from 'react'
import noteservice from './noteservice'

let notificationTimer = null

const findHashtags = (notestr) => {
  let hashtags = [];

  // remove all control characters (line endings etc)
  notestr = notestr.replace(/[^\x20-\x7E]/gmi, " ")

  notestr.split(" ").map((element) => {
     if (element[0] == "#" && element.length > 1) {
        // trim all whitespaces and newlines from the hashtag string
        const trimmed_el = element.trim()

        // if hashtag not present yet, add it
        if (hashtags.indexOf(trimmed_el) < 0) {
           hashtags.push(trimmed_el)
        }
     }
  })

  return hashtags
}

const updateHashtags = (data, setHashtags) => {
  const htarray = data.reduce((accumulator, currentdata) => {
    const ht = findHashtags(currentdata.text)
    const htmap = ht.map((h) => {
      return {name:h, linksto:currentdata.noteid} // [{name:'test', selected:true}]
    })

    return accumulator.concat(htmap)
  }, [])

  setHashtags(htarray)
}

const Notification = ({msg, setNotification}) => {

  clearTimeout(notificationTimer)
  notificationTimer = setTimeout(()=>{
    setNotification(null)
  }, 3000)

  // render only if there is something to render
  if (msg === null) {
    return null
  }

  return (<div className='notification'>{msg}</div>)
}

const Memory = ({note, notes, setNotes, setNotification, setHashtags}) => {

  const datestr = new Date(note.date).toString()

  const onClickDelete = () => {
    noteservice.del(note.noteid)
      .then(() => {
        const newNotes = notes.filter(n => {
          if (n.noteid !== note.noteid) {
            return n
          }  
        })
        setNotes(newNotes)
        updateHashtags(newNotes, setHashtags)
        setNotification(`Note deleted.`)
      })
  }

  return (
    <div className={'memory'}>
      <div className={'date'}>
        {datestr}
      </div>
      {note.text}
      <br/>
      <button onClick={onClickDelete}>delete</button>
    </div>)
}

const Memories = ({notes, setNotes, setNotification, setHashtags}) => {
  return (<div className={'memory_container'}>
  {notes.map((note)=> {return <Memory key={note.noteid} note={note} notes={notes} setNotes={setNotes} setNotification={setNotification} setHashtags={setHashtags}/>})}
  </div>
  )
}

const Hahstagbutton = ({name, selected}) => {
  const onClick = () => {
    event.preventDefault()
    
  }

  if (selected) {
    return (<button value={name} className='selected' onClick={onClick}>{name}</button>)
  } else {
    return (<button value={name} className='hashtag' onClick={onClick}>{name}</button>)
 }
}

const Hashtags = ({hashtags, selected}) => {

  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags.map(ht=>ht.name))]

  return (<div className='hashtags_container'>
  <form name = 'hashtagsform' action='/' method='POST'>
    <button name='selected_hashtag' value='all' type='submit' className='hashtag'>Show all</button>
    {uniquehts.map((ht, i) => {
      return (<Hahstagbutton key={i} name={ht} selected={selected}/>)
    })}
  </form>
  </div>)
}

const Logoutform = ({username}) => {
  return (<form name = 'logoutform' action='/' method='POST'>
  Connected as {username}.
  <input name='logoutbutton' type='submit' value='logout'></input>
  </form>)
} 

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

const App = () => {

  const [notes, setNotes] = useState([])
  const [memo, setMemo] = useState('')
  const [notification, setNotification] = useState(null)
  const [hashtags, setHashtags] = useState([])
  
  const getAll = () => {
    noteservice.getAll()
      .then(data => {

        updateHashtags(data, setHashtags)
        setNotes(data)
      })
  }
  
  useEffect(getAll, [])
 
  return (<><h1>Meerkat</h1>
          <Notification msg={notification} setNotification={setNotification}/>
          <Logoutform username={'test'}/>
          <Pushform notes={notes} setNotes={setNotes} memo={memo} setMemo={setMemo} setNotification={setNotification} setHashtags={setHashtags}/>
          <Hashtags hashtags={hashtags} selected={false}/>
          <Memories notes={notes} setNotes={setNotes} setNotification={setNotification} setHashtags={setHashtags}/>
          </>)
}

export default App
