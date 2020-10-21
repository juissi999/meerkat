const authReducer = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loggedIn: true }
    case 'LOGOUT':
      return { ...state, loggedIn: false }
    default:
      // if none above
      return state
  }
}

export default authReducer
