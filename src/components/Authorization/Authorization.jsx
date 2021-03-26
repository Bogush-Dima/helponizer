import { useState } from "react";
import styles from "./Authorization.module.css";
import { fireAuth, fireGoogleProvider } from "firebase.js";
import clsx from "clsx";

export const Authorization = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const changeInputsValues = (event, setValue) => {
    event.preventDefault();
    setValue(event.target.value);
    setEmailErr("");
    setPasswordErr("");
  };

  const enterUser = async (event) => {
    event.preventDefault();
    const changedName = name + "@helponizer.com";

    switch (event.target.id) {
      case "signIn":
        await fireAuth
          .signInWithEmailAndPassword(changedName, password)
          .catch((error) => {
            const { code, message } = error;
            code.includes("email")
              ? setEmailErr(message)
              : setPasswordErr(message);
            console.log(error.code);
          });
        break;

      case "signUp":
        await fireAuth
          .createUserWithEmailAndPassword(changedName, password)
          .then((info) => {
            const { user } = info;
            user.updateProfile({
              displayName: name,
            });
          })
          .catch((error) => {
            const { code, message } = error;
            code.includes("email")
              ? setEmailErr(message)
              : setPasswordErr(message);
            console.log(error.code);
          });
        break;

      case "signInWithGoogle":
        await fireAuth
          .signInWithPopup(fireGoogleProvider)
          .catch((error) => console.log(error.message));
        break;

      case "signInDev":
        await fireAuth
          .signInWithEmailAndPassword("DEV@helponizer.com", "111111")
          .catch((error) => {
            console.log(error.code);
            console.log(error.message);
          });
        break;

      default:
        break;
    }
    setName("");
    setPassword("");
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.inputs}>
          <input
            className={styles.input}
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
          <input
            className={styles.input}
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
          <button className={styles.button} id="signIn" onClick={enterUser}>
            Sign In
          </button>
          <button className={styles.button} id="signUp" onClick={enterUser}>
            Sign Up
          </button>
          <button
            className={styles.button}
            id="signInWithGoogle"
            onClick={enterUser}
          >
            Log In with Google
          </button>
          <button
            className={`${styles.button} ${styles.devBtn}`}
            id="signInDev"
            onClick={enterUser}
          >
            Develope
          </button>
        </div>
      </form>
    </div>
  );
};
