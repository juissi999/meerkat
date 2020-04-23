import React from 'react'
import HashtagButton from './Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const HashtagList = ({hashtags, selectedHts, setSelectedHts}) => {

  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags.map(ht=>ht.name))]

  const mapHts = () => {
    
    return uniquehts.map((ht, i) => <HashtagButton key={i} name={ht} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>)
  }

  return (<ButtonGroup toggle className="mb-2">
            {mapHts()}
            </ButtonGroup>)
}

export default HashtagList
