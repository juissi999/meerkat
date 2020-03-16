import React, {useEffect, useState} from 'react'

const Hahstagbutton = ({name, selectedHts, setSelectedHts}) => {
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

  if (isselected) {
    return (<button value={name} className='selected' onClick={onClick}>{name}</button>)
  } else {
    return (<button value={name} className='hashtag' onClick={onClick}>{name}</button>)
 }
}

const Hashtags = ({hashtags, selectedHts, setSelectedHts}) => {

  // find only the unique hashtags
  const uniquehts = [...new Set(hashtags.map(ht=>ht.name))]

  return (<div className='hashtags_container'>
    {uniquehts.map((ht, i) => {
      return (<Hahstagbutton key={i} name={ht} selectedHts={selectedHts} setSelectedHts={setSelectedHts}/>) //selectedHts.includes(ht)
    })}
  </div>)
}

export {Hashtags}
