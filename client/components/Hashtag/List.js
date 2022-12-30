import React from 'react'
import HashtagButton from './Button'

const HashtagList = ({
  hashtags,
  selectedHts,
  setSelectedHts,
  setStartIndex
}) => {
  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags)]

  const onClickHashtag = (name) => {
    // check if hashtag is on selectedHts hook array and remove it
    // if it is or append it if it's not
    const isselected = selectedHts.includes(name)

    if (isselected) {
      setSelectedHts(
        selectedHts.filter((htname) => {
          if (htname !== name) {
            return htname
          }
        })
      )
    } else {
      // add hashtag to selected
      setSelectedHts(selectedHts.concat(name))
    }

    setStartIndex(0)
  }

  const mapHts = () => {
    return uniquehts.map((ht, i) => (
      <HashtagButton
        key={i}
        name={ht}
        isSelected={selectedHts.includes(ht)}
        onClickHashtag={onClickHashtag}
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
