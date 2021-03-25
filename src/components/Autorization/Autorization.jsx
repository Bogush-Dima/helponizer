import { useContext, useState, useReducer } from "react";
import styles from "./Autorization.module.css";
import { fireAuth, fireGoogleProvider } from "firebase.js";
import clsx from "clsx";
import { Context } from "App";
import {userReducer} from 'reducers/userReducer'
import {SignInWithGoogle} from 'actions/userActions'

export const Autorization = ({ setUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const {user} = useContext(Context)

  const [state, dispatch] = useReducer(userReducer, user)

  const changeInputsValues = (event, setValue) => {
    event.preventDefault();
    setValue(event.target.value);
    setEmailErr("");
    setPasswordErr("");
  };

  const createUserName = (value) =>
    value[0].toUpperCase() + value.slice(1, value.search("@"));

  const signIn = (event) => {
    event.preventDefault();
    const changedName = name + "@helponizer.com";
    fireAuth
      .signInWithEmailAndPassword(changedName, password)
      .then(() => {
        const getUserInfoFromLS = window.localStorage.getItem("user");
        const userInfoToLS = { name: changedName, password };
        if (getUserInfoFromLS) {
          window.localStorage.removeItem("user");
        }
        window.localStorage.setItem("user", JSON.stringify(userInfoToLS));
        setName("");
        setPassword("");
        setUser(fireAuth.currentUser);
      })
      .catch((error) => {
        const { code, message } = error;
        code.includes("email") ? setEmailErr(message) : setPasswordErr(message);
        console.log(error.code);
      });
  };

  const signUp = (event) => {
    event.preventDefault();
    const changedName = name + "@helponizer.com";
    fireAuth
      .createUserWithEmailAndPassword(changedName, password)
      .then((info) => {
        const {user} = info
        const { email } = user;
        const getUserInfoFromLS = window.localStorage.getItem("user");
        const userInfoToLS = { name: changedName, password };
        setUser(user);

        if (getUserInfoFromLS) {
          window.localStorage.removeItem("user");
        }
        window.localStorage.setItem("user", JSON.stringify(userInfoToLS));
        user.updateProfile({
          displayName: createUserName(email),
        });
      })
      .then(() => {
        setName("");
        setPassword("");
        // setUser(fireAuth.currentUser);
      })
      .catch((error) => {
        const { code, message } = error;
        code.includes("email") ? setEmailErr(message) : setPasswordErr(message);
        console.log(error.code);
      });
  };

  const signInWithGoogle = async () => {
    const user = await fireAuth.signInWithPopup(fireGoogleProvider)
    setUser(fireAuth)
  }

  const signInDev = (event) => {
    event.preventDefault();
    fireAuth
      .signInWithEmailAndPassword("DEV@helponizer.com", "111111")
      .then(() => {
        const getUserInfoFromLS = window.localStorage.getItem("user");
        const userInfoToLS = { name: "DEV@helponizer.com", password: "111111" };

        if (getUserInfoFromLS) {
          window.localStorage.removeItem("user");
        }
        window.localStorage.setItem("user", JSON.stringify(userInfoToLS));
        setName("");
        setPassword("");
        setUser(fireAuth.currentUser);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={signIn}>
        <div className={styles.inputs}>
          <input className={styles.input}
            type="email"
            placeholder="Name"
            value={name}
            onChange={(event) => changeInputsValues(event, setName)}
          />
          <p
            className={clsx(styles.error, { [styles.messageError]: emailErr })}
          >
            {emailErr}
          </p>
          <input className={styles.input}
            type="password"
            placeholder="Password (min 6 symbols)"
            value={password}
            onChange={(event) => changeInputsValues(event, setPassword)}
          />
          <p
            className={clsx(styles.error, {
              [styles.messageError]: passwordErr,
            })}
          >
            {passwordErr}
          </p>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={signIn}>Sign In</button>
          <button className={styles.button} onClick={signUp}>Sign Up</button>
          <button className={styles.button} onClick={signInWithGoogle}>Log In with Google</button>
          <button className={`${styles.button} ${styles.devBtn}`} onClick={signInDev}>
            Develope
          </button>
        </div>
      </form>
    </div>
  );
};
