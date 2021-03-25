import {
  SignInWithGoogleConst,
  SignInConst,
  SignUpConst,
  SignOutConst,
} from "constants/userConstants";

export const userReducer = (state, action) => {
  switch (action.type) {
    case SignInWithGoogleConst:
      return action.payload;
    case SignUpConst:
      return action.payload;
    case SignInConst:
      return action.payload;
    case SignOutConst:
      return action.payload;
    default:
      return state;
  }
};
