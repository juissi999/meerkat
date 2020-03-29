import React from 'react'
import HashtagButton from './HashtagButton'

const Hashtags = ({hashtags, selectedHts, setSelectedHts}) => {

  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags.map(ht=>ht.name))]

  const mapHts = () => {
    
    return uniquehts.map((ht, i) => <HashtagButton key={i} name={ht} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>)
  }

  return (<div className='hashtags_container'>
            {mapHts()}
          </div>)
}

export default Hashtags
