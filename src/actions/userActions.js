import { fireAuth, fireGoogleProvider } from "firebase.js";
import {SignInWithGoogleConst} from 'constants/userConstants'

export const SignInWithGoogle = async () => {
  const user = await fireAuth.signInWithPopup(fireGoogleProvider);
  return {
    type: SignInWithGoogleConst,
    payload: user
  }
}