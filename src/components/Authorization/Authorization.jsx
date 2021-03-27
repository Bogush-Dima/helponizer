import React from "react";
import styles from "./Authorization.module.css";
import { fireAuth, fireGoogleProvider } from "utils/firebase.js";

export const Authorization = () => {
  const signIn = (event) => {
    event.preventDefault();
    fireAuth.signInWithPopup(fireGoogleProvider).catch(({message}) => {
      throw new Error(message);
    });
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={signIn}>
        Log In with Google
      </button>
    </div>
  );
};
