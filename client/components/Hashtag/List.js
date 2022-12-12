import React from 'react'
import HashtagButton from './Button'

const HashtagList = ({ hashtags, selectedHts, setSelectedHts }) => {
  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags)]

  const mapHts = () => {
    return uniquehts.map((ht, i) => (
      <HashtagButton
        key={i}
        name={ht}
        selectedHts={selectedHts}
        setSelectedHts={setSelectedHts}
      />
    ))
  }

  if (uniquehts.length === 0) {
    return <>Add hashtags to your notes.</>
  } else {
    return <>{mapHts()}</>
  }
}

export default HashtagList
