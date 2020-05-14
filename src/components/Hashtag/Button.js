import React from 'react'
import Button from 'react-bootstrap/Button'

const HashtagButton = ({ name, selectedHts, setSelectedHts }) => {
  const isselected = selectedHts.includes(name)

  // check if hashtag is on selectedHts hook array and remove it
  // if it is or append it if it's not
  const onClick = () => {
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
  }

  let variant = 'light'
  if (isselected) {
    variant = 'info'
  }
  return (
    <>
      <Button className="mb-1" variant={variant} value={name} onClick={onClick}>
        {name}
      </Button>{' '}
    </>
  )
}

export default HashtagButton
