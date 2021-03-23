import styles from "./Autorization.module.css";
import { fireAuth } from "firebase.js";
import { useState } from "react";
import clsx from "clsx";

export const Autorization = ({ setUser }) => {
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
        const { email } = info.user;
        const getUserInfoFromLS = window.localStorage.getItem("user");
        const userInfoToLS = { name: changedName, password };

        if (getUserInfoFromLS) {
          window.localStorage.removeItem("user");
        }
        window.localStorage.setItem("user", JSON.stringify(userInfoToLS));
        info.user.updateProfile({
          displayName: createUserName(email),
        });
      })
      .then(() => {
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
          <button className={`${styles.button} ${styles.devBtn}`} onClick={signInDev}>
            Develope
          </button>
        </div>
      </form>
    </div>
  );
};
