import React, { useState } from "react";
import clsx from "clsx";
import styles from "./SideBar.module.css";
import { TodoLists } from "./TodoLists/TodoLists";
import {fireAuth} from 'firebase.js'

const SideBar = ({flagApp, setFlagApp}) => {
  const [toggleTodoLists, setToggleTodoLists] = useState(false);

  const clickTodoLists = () => {
    setFlagApp(!flagApp)
    setToggleTodoLists(!toggleTodoLists);
  };

  return (
    <nav className={styles.navBar}>
        <ul className={styles.list}>
          <li
            className={clsx(styles.listItem, {
              [styles.open]: toggleTodoLists,
            })}
            onClick={clickTodoLists}
          >
            Todo Lists
          </li>
          <TodoLists toggleTodoLists={toggleTodoLists} />
        </ul>
    </nav>
  );
};

export default SideBar;
