import {SignInWithGoogleConst} from 'constants/userConstants'

export const signInWithGoogle = (user) => {
  return {
    type: SignInWithGoogleConst,
    payload: user
  }
}