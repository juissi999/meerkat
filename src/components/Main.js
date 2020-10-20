import React from 'react'
import { useSelector } from 'react-redux'
import Meerkat from './Meerkat'
import Landing from './Landing'

const Main = () => {

  const isLoggedIn = useSelector(state => state.loggedIn)

  const render = () => {
    if (isLoggedIn) {
      return <Meerkat />
    } else {
      return <Landing />}
  }

  return (<>
            {render()}
          </>
         )
}

export default Main
