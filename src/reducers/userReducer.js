import {SignInWithGoogleConst} from 'constants/userConstants'

export const userReducer = (state, action) => {
  switch (action.type) {
    case SignInWithGoogleConst:
      return action.payload
    default:
      return state
  }
}