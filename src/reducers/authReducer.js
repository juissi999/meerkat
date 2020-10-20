const authReducer = (state = 'LOGGEDOUT', action) => {
  switch (action.type) {
    case 'LOGIN':
      return 'LOGGEDIN'
    case 'LOGOUT':
      return 'LOGGEDOUT'
    default:
      // if none above
    return state
  }
}

export default authReducer
