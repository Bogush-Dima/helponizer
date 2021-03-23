import styles from "./Autorization.module.css";
import { fireAuth } from "firebase.js";
import { useState } from "react";

export const Autorization = ({ setUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const changeInputsValues = (event, setValue) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const createUserName = (value) =>
    value[0].toUpperCase() + value.slice(1, value.search("@"));

  const signIn = (event) => {
    event.preventDefault();
    const changedName = name + "@helponizer.com";
    fireAuth
      .signInWithEmailAndPassword(changedName, password)
      .then(() => {
        setName("");
        setPassword("");
        setUser(fireAuth.currentUser);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const signUp = (event) => {
    event.preventDefault();
    const changedName = name + "@helponizer.com";
    fireAuth
      .createUserWithEmailAndPassword(changedName, password)
      .then((info) => {
        const {email} = info.user;

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
        console.log(error.code);
        console.log(error.message);
      });
  };

  const signInDev = (event) => {
    event.preventDefault();
    fireAuth
      .signInWithEmailAndPassword("DEV@helponizer.com", '111111')
      .then(() => {
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
      <form className={styles.form}>
        <input
          type="email"
          placeholder="Name"
          value={name}
          onChange={(event) => changeInputsValues(event, setName)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(event) => changeInputsValues(event, setPassword)}
        />
        <button onClick={signUp}>Sign Up</button>
        <button onClick={signIn}>Sign In</button>
        <button className={styles.devBtn} onClick={signInDev}>Develope</button>
      </form>
    </div>
  );
};
