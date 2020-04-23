import React from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'


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

  return (<ToggleButton variant="outline-info" type="checkbox" checked={isselected} value={name} onChange={onClick}>{name}</ToggleButton>)
}

export default HashtagButton
