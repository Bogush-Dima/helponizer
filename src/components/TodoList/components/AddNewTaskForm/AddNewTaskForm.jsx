import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import NotificationSystem from "react-notification-system";
import styles from "./AddNewTaskForm.module.css";
import firebase from "firebase.js";

const AddNewTaskForm = ({ category }) => {
  const [inputValue, setInputValue] = useState("");
  const todos = useSelector((store) => store.todos);

  const addTodo = (value, path) => {
    const todoInfo = {
      title: value,
      completed: false,
      category: path,
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
    const path = window.location.pathname.slice(1);
    console.log(path);
    const firebaseTodos = firebase.ref(`/todos_${path}`);
    event.preventDefault();
    if (
      todos.find(
        (todo) => todo.title === inputValue && path === todo.category
      )
    ) {
      addNotification();
      setInputValue(inputValue);
    } else {
      firebaseTodos.push(addTodo(inputValue, path));
      setInputValue("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <NotificationSystem ref={notificationSystem} />
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
        add
      </button>
    </form>
  );
};

export default AddNewTaskForm;
