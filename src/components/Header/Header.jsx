import React from "react";
import { fireAuth } from "firebase.js";
import styles from "./Header.module.css";
import logo from "./logo.png";
import { NavLink } from "react-router-dom";

export const Header = ({ userName, setUser }) => {
  const signOut = (event) => {
    event.preventDefault();
    window.location.pathname = "/";
    fireAuth
      .signOut()
      .then(() => {
        const getUserInfoFromLS = window.localStorage.getItem("user");
        if (getUserInfoFromLS) {
          window.localStorage.removeItem("user");
        }
        setUser(fireAuth.currentUser);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <header className={styles.header}>
      <NavLink className={styles.home} to="">
        <img className={styles.logo} src={logo} alt="logo" />
      </NavLink>
      <div className={styles.user}>
        <p className={styles.userName}>{userName}</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </header>
  );
};
