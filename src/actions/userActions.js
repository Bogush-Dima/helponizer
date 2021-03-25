import {
  SignInWithGoogleConst,
  SignInConst,
  SignUpConst,
  SignOutConst,
} from "constants/userConstants";

export const signInWithGoogle = (user) => {
  return {
    type: SignInWithGoogleConst,
    payload: user,
  };
};

export const signIn = (user) => {
  return {
    type: SignInConst,
    payload: user,
  };
};

export const signUp = (user) => {
  return {
    type: SignUpConst,
    payload: user,
  };
};

export const signOut = () => {
  return {
    type: SignOutConst,
    payload: null,
  };
};
