import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import authReducer from '../reducers/authReducer'
import AuthBar from './AuthBar'
import Main from './Main'

const App = () => {

  const store = createStore(authReducer)

  return (<Provider store={store}>
            <AuthBar/>
            <Main />
          </Provider>
         )
}

export default App
