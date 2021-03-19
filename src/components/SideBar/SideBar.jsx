import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotificationSystem from "react-notification-system";
import clsx from "clsx";
import styles from "./SideBar.module.css";
import { fireData, fireAuth } from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";

const SideBar = ({ userName, setUser }) => {
  const [allCategoriesNames, setAllCategoriesNames] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fireData.ref(`/${TODOS}/${ALLCATEGORIESNAMES}`).on("value", (snapshot) => {
      const categoriesNamesArr = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const value = childSnapshot.val();
        categoriesNamesArr.push({ key, value });
      });
      setAllCategoriesNames(categoriesNamesArr);
    });
  }, []);

  const signOut = (event) => {
    event.preventDefault();
    fireAuth
      .signOut()
      .then(() => setUser(fireAuth.currentUser))
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const changeInput = (event) => {
    setCategoryName(event.target.value);
  };

  const notificationSystem = React.useRef();

  const addNotification = () => {
    const notification = notificationSystem.current;
    notification.addNotification({
      message: "You are already have category with the same name",
      level: "warning",
    });
  };

  const submitCategoryName = (event) => {
    event.preventDefault();
    const finalResultCategoryName = categoryName.trim().toLowerCase();
    const isAvailable = (el) => el.value === finalResultCategoryName;
    if (allCategoriesNames.some(isAvailable)) {
      addNotification();
    } else {
      if (finalResultCategoryName) {
        fireData
          .ref(`/${TODOS}/${ALLCATEGORIESNAMES}`)
          .push(finalResultCategoryName);
      }
      setCategoryName("");
      setShowInput(!showInput);
    }
  };

  return (
    <nav className={styles.navBar}>
      <button onClick={signOut}>Sign Out</button>
      <h2 className={styles.userName}>{userName}</h2>
      <NotificationSystem ref={notificationSystem} />
      <div className={styles.wrapper}>
        <form className={styles.addCategoryForm} onSubmit={submitCategoryName}>
          <input
            className={clsx(styles.input, {
              [styles.showInput]: showInput,
            })}
            type="text"
            value={categoryName}
            onChange={changeInput}
            placeholder="Add new category"
          />
        </form>

        <button
          className={clsx(styles.plusBtn, {
            [styles.plusBtnHidden]: showInput,
          })}
          onClick={toggleInput}
        >
          +
        </button>

        <ul className={styles.list}>
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="">
              Main
            </NavLink>
          </li>
          {allCategoriesNames.map(({ key, value }) => {
            const filteredCategoryName = value.replaceAll(" ", "");
            const title = value[0].toUpperCase() + value.slice(1);
            return (
              <li className={styles.listItem} key={key}>
                <NavLink className={styles.link} to={filteredCategoryName}>
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
