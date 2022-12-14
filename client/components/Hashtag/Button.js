import React from 'react'
import Button from 'react-bootstrap/Button'

const HashtagButton = ({ name, isSelected, onClickHashtag }) => {
  let variant = 'light'
  if (isSelected) {
    variant = 'info'
  }
  return (
    <>
      <Button
        className="mb-1"
        variant={variant}
        value={name}
        onClick={() => onClickHashtag(name)}
      >
        {name}
      </Button>{' '}
    </>
  )
}

export default HashtagButton
