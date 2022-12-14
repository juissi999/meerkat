import React, { useEffect } from 'react'
import Meerkat from './Meerkat'

const bgColors = [
  'lightblue',
  'lightgreen',
  'lightpink',
  'plum',
  'lightgrey',
  'wheat',
  'darkseagreen'
]

const App = () => {
  useEffect(() => {
    // the mounted hook
    const orig = document.body.className
    document.body.style.backgroundColor =
      bgColors[Math.floor(Math.random() * bgColors.length)]
    return () => {
      document.body.className = orig
    }
  }, [])

  return <Meerkat />
}

export default App
