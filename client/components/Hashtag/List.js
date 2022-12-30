import React from 'react'
import HashtagButton from './Button'

const HashtagList = ({
  hashtags,
  selectedHts,
  setSelectedHts,
  setStartIndex,
  ISSINGLESELECT
}) => {
  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags)]

  const onClickHashtag = (hashtagName) => {
    // check if hashtag is on selectedHts hook array and remove it
    // if it is or append it if it's not
    const isSelected = selectedHts.includes(hashtagName)

    if (ISSINGLESELECT) {
      setSingleSelectHashtag(hashtagName, isSelected)
    } else {
      setMultiSelectHashtag(hashtagName, isSelected)
    }

    setStartIndex(0)
  }

  const setSingleSelectHashtag = (hashtagName, isSelected) => {
    if (isSelected) {
      setSelectedHts([])
    } else {
      setSelectedHts([hashtagName])
    }
  }

  const setMultiSelectHashtag = (hashtagName, isSelected) => {
    if (isSelected) {
      setSelectedHts(
        selectedHts.filter((selectedHtName) => {
          if (selectedHtName !== hashtagName) {
            return selectedHtName
          }
        })
      )
    } else {
      // add hashtag to selected
      setSelectedHts(selectedHts.concat(hashtagName))
    }
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
