import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./SideBar.module.css";
import firebase from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";

const SideBar = () => {
  const [allCategoriesNames, setAllCategoriesNames] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    firebase.ref(`/${TODOS}/${ALLCATEGORIESNAMES}`).on("value", (snapshot) => {
      const categoriesNamesArr = [];
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        categoriesNamesArr.push(data);
      });
      setAllCategoriesNames(categoriesNamesArr);
    });
  }, []);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const changeInput = (event) => {
    setCategoryName(event.target.value);
  };

  const submitCategoryName = (event) => {
    event.preventDefault();
    // const trimmed = categoryName.trim();
    const finalResultCategoryName = categoryName.trim();
    firebase
      .ref(`/${TODOS}/${ALLCATEGORIESNAMES}`)
      .push(finalResultCategoryName);
    setCategoryName("");
    setShowInput(!showInput);
  };

  return (
    <nav className={styles.navBar}>
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
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="work">
              Work
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink className={styles.link} to="private">
              Private
            </NavLink>
          </li>
          {allCategoriesNames.map((categoryName) => {
            const filteredCategoryName = categoryName.replaceAll(" ", "");
            const title = categoryName[0].toUpperCase() + categoryName.slice(1)
            return (
              <li className={styles.listItem}>
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
