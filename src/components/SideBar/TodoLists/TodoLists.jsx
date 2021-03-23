import React, { useEffect, useState } from "react";
import NotificationSystem from "react-notification-system";
import clsx from "clsx";
import styles from "./TodoLists.module.css";
import { fireData, fireAuth } from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";
import { NavLink } from "react-router-dom";

export const TodoLists = ({ toggleTodoLists }) => {
  const [todoLists, setTodoLists] = useState([]);
  const [userName] = useState(fireAuth.currentUser.displayName);
  const [todoListName, setTodoListName] = useState("");
  const notificationSystem = React.useRef();

  useEffect(() => {
    fireData
      .ref(`/${userName}/${TODOS}/${ALLCATEGORIESNAMES}`)
      .on("value", (snapshot) => {
        const todoListsArr = [];
        snapshot.forEach((todoList) => {
          const key = todoList.key;
          const value = todoList.val();
          todoListsArr.push({ key, value });
        });
        setTodoLists(todoListsArr);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addNotification = () => {
    const notification = notificationSystem.current;
    notification.addNotification({
      message: "You are already have todo list with the same name",
      level: "warning",
    });
  };

  const changeInput = (event) => {
    setTodoListName(event.target.value);
  };

  const submittodoListName = (event) => {
    event.preventDefault();
    const finalResultTodoListName = todoListName.trim().toLowerCase();
    const isAvailable = (el) => el.value === finalResultTodoListName;

    if (todoLists.some(isAvailable)) {
      addNotification();
    } else {
      if (finalResultTodoListName) {
        fireData
          .ref(`/${userName}/${TODOS}/${ALLCATEGORIESNAMES}`)
          .push(finalResultTodoListName);
      }
      setTodoListName("");
    }
  };

  return (
    <ul
      className={clsx(styles.ul, {
        [styles.hiddenItem]: !toggleTodoLists,
      })}
    >
      <NotificationSystem ref={notificationSystem} />
      <form className={styles.form} onSubmit={submittodoListName}>
        <input
          className={styles.input}
          type="text"
          value={todoListName}
          onChange={changeInput}
          placeholder="Add new todo list"
        />
      </form>

      {todoLists.map(({ key, value }) => {
        const filteredtodoListName = value.replaceAll(" ", "");
        const title = value[0].toUpperCase() + value.slice(1);
        return (
          <li className={styles.item} key={key}>
            <NavLink className={styles.link} to={filteredtodoListName}>
              {title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
