import React, {useEffect, useState} from 'react'
import axios from 'axios'

const baseUrl = '/notes'

const Memories = ({notes}) => {
  return (<div className={'memory_container'}>
  {notes.map((note)=> {
    return (
    <div className={'memory'}>
      <div className={'date'}>
        {note.date}
      </div>
      {note.text}
    </div>)})}
  </div>
  )
}


const Hashtags = ({hashtags}) => {
  return (<div class='hashtags_container'>
  <form name = 'hashtagsform' action='/' method='POST'>
    <button name='selected_hashtag' value='all' type='submit' className='hashtag'>Show all</button>
    {hashtags.map((ht) => {
      if (ht.selected) {
        return (<button name='selected_hashtag' value={ht.name} type='submit' className='selected'>{ht.name}</button>)
      } else {
        return (<button name='selected_hashtag' value={ht.name} type='submit' className='hashtag'>{ht.name}</button>)
     }})}     
  </form>
  </div>
  )
}

const Logoutform = ({username}) => {
  return (<form name = 'logoutform' action='/' method='POST'>
  Connected as {username}.
  <input name='logoutbutton' type='submit' value='logout'></input>
  </form>)
} 

const Pushform = ({memo, setMemo, notes, setNotes}) => {

  const newentry = {'text':memo, 'date':'nan'}

  const on_submit = (event) => {
    event.preventDefault()

    const promise = axios.post(baseUrl, newentry)
    promise.then((response)=> {
      setNotes(notes.concat(response.data))
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
    const promise = axios.get(baseUrl)
    promise.then(response => setNotes(response.data))
  }
  
  useEffect(getAll, [])
 
  return (<><h1>Meerkat</h1>
          <Logoutform username={'test'}/>
          <Pushform notes={notes} setNotes={setNotes} memo={memo} setMemo={setMemo}/>
          <Hashtags hashtags={[{name:'test', selected:true}]}/>
          <Memories notes={notes} />
          </>)
}

export default App