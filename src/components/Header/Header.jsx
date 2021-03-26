import React, { useContext } from "react";
import { fireAuth } from "utils/firebase.js";
import styles from "./Header.module.css";
import logo from 'assets/logo.png';
import { NavLink } from "react-router-dom";
import { Context } from "utils/context";
import { AUTHORIZATION, HOME } from "constants/constants";

export const Header = () => {
  const { user } = useContext(Context);

  const signOut = (event) => {
    event.preventDefault();
    window.location.pathname = AUTHORIZATION;
    fireAuth.signOut().catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
  };

  return (
    <header className={styles.header}>
      <NavLink className={styles.home} to={HOME}>
        <img className={styles.logo} src={logo} alt="logo" />
      </NavLink>
      <div className={styles.user}>
        <p className={styles.userName}>{user.displayName}</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </header>
  );
};
