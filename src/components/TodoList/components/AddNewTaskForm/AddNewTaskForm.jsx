import React from "react";
import { useState, useEffect } from "react";
import NotificationSystem from "react-notification-system";
import styles from "./AddNewTaskForm.module.css";
import { fireData } from "firebase.js";
import { TODOS } from "firebaseConstants";

const AddNewTaskForm = () => {
  const path = window.location.pathname.slice(1);
  const firebaseTodosCategory = fireData.ref(`/${TODOS}/${path}`);
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState("");

  useEffect(() => {
    firebaseTodosCategory.on("value", (snapshot) => {
      const todosArr = [];
      snapshot.forEach((elem) => {
        const key = elem.key;
        const data = elem.val();
        todosArr.push({ key, ...data });
      });
      setTodos(todosArr);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTodo = (value, path) => {
    const todoInfo = {
      title: value,
      completed: false,
      category: path.toLowerCase(),
    };
    return todoInfo;
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const notificationSystem = React.useRef();

  const addNotification = () => {
    const notification = notificationSystem.current;
    notification.addNotification({
      message: "You are already have task with the same name",
      level: "warning",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      todos.find((todo) => todo.title === inputValue && path === todo.category)
    ) {
      addNotification();
      setInputValue(inputValue);
    } else {
      firebaseTodosCategory.push(createTodo(inputValue, path));
      setInputValue("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <NotificationSystem ref={notificationSystem} />
      <div className={styles.container}>
        <input
          className={styles.newTask}
          spellCheck="false"
          type="text"
          placeholder="Add Task"
          value={inputValue}
          onChange={changeInputValue}
        />
        <button
          className="button add-button"
          type="submit"
          disabled={!inputValue}
        >
          +
        </button>
      </div>
    </form>
  );
};

export default AddNewTaskForm;
