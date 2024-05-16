import React, { useEffect } from 'react'
import Meerkat from './Meerkat'

const bgColors = ['#f6f5f0']

const App = () => {
  useEffect(() => {
    // the mounted hook
    const orig = document.body.className
    document.body.style.backgroundColor =
      bgColors[Math.floor(Math.random() * bgColors.length)]
    document.body.style.color = '#4b5361'
    return () => {
      document.body.className = orig
    }
  }, [])

  return <Meerkat />
}

export default App
