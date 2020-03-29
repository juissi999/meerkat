import React from 'react'
import HashtagButton from './HashtagButton'

const Hashtags = ({hashtags, selectedHts, setSelectedHts}) => {

  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags.map(ht=>ht.name))]

  return (<div className='hashtags_container'>
    {uniquehts.map((ht, i) => {
      return (<HashtagButton key={i} name={ht} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>) //selectedHts.includes(ht)
    })}
  </div>)
}

export default Hashtags
