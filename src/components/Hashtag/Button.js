import React from 'react'

const HashtagButton = ({name, selectedHts, setSelectedHts}) => {

  const isselected = selectedHts.includes(name)

  // check if hashtag is on selectedHts hook array and remove it
  // if it is or append it if it's not
  const onClick = () => {
    if (isselected) {
      setSelectedHts(selectedHts.filter(htname=>{
        if (htname!==name){
          return htname
        }
      }))
    } else {
      // add hashtag to selected
      setSelectedHts(selectedHts.concat(name))
    }
  }

  // decide which class is give to button
  const buttonclass = isselected ? 'selected' : 'hashtag'

  return (<button value={name} className={buttonclass} onClick={onClick}>{name}</button>)
}

export default HashtagButton
