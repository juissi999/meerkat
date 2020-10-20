const authReducer = (state = true, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true
    case 'LOGOUT':
      return false
    default:
      // if none above
    return state
  }
}

export default authReducer
