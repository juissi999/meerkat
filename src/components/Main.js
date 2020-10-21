import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Meerkat from './Meerkat'
import Landing from './Landing'

const Main = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch({ type: 'LOGIN' })
    }
  }, [])

  const isLoggedIn = useSelector((state) => state.loggedIn)

  const render = () => {
    if (isLoggedIn) {
      return <Meerkat />
    } else {
      return <Landing />
    }
  }

  return <>{render()}</>
}

export default Main
