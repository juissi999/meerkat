import React, {useEffect, useState} from 'react'
import noteservice from './noteservice'

const Memory = ({id, date, text, notes, setNotes}) => {
  
  const datestr = new Date(date).toString()

  const onClickDelete = () => {
    noteservice.del(id)
      .then(setNotes(notes.filter(note => {
        if (note.id !== id) {
          return note
        }
      })))
  }

  return (
    <div className={'memory'}>
      <div className={'date'}>
        {datestr}
      </div>
      {text}
      <br/>
      <button onClick={onClickDelete}>delete</button>
    </div>)
}

const Memories = ({notes, setNotes}) => {
  return (<div className={'memory_container'}>
  {notes.map((note)=> {return <Memory key={notes.id} date={note.date} text={note.text} id={note.id} notes={notes} setNotes={setNotes}/>})}
  </div>
  )
}

const Hahstagbutton = ({name, selected}) => {
  if (selected) {
    return (<button name='selected_hashtag' value={name} type='submit' className='selected'>{name}</button>)
  } else {
    return (<button name='selected_hashtag' value={name} type='submit' className='hashtag'>{name}</button>)
 }
}

const Hashtags = ({hashtags}) => {
  return (<div className='hashtags_container'>
  <form name = 'hashtagsform' action='/' method='POST'>
    <button name='selected_hashtag' value='all' type='submit' className='hashtag'>Show all</button>
    {hashtags.map((ht, i) => {
      <Hahstagbutton key={i} name={ht.name} selected={ht.selected}/>
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

const Pushform = ({memo, setMemo, notes, setNotes}) => {

  const newentry = {'text':memo}

  const on_submit = (event) => {
    event.preventDefault()

    noteservice
      .post(newentry)
      .then(addedentry => {
        setNotes(notes.concat(addedentry))
        setMemo('')
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
  
  const getAll = () => {
    noteservice.getAll()
      .then(data => setNotes(data))
  }
  
  useEffect(getAll, [])
 
  return (<><h1>Meerkat</h1>
          <Logoutform username={'test'}/>
          <Pushform notes={notes} setNotes={setNotes} memo={memo} setMemo={setMemo}/>
          <Hashtags hashtags={[{name:'test', selected:true}]}/>
          <Memories notes={notes} setNotes={setNotes} />
          </>)
}

export default App
