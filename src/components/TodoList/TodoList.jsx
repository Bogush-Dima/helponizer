import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./TodoList.module.css";
import firebase from "firebase.js";
import { TODOS } from "firebaseConstants";
import AddNewTaskForm from "components/TodoList/components/AddNewTaskForm/AddNewTaskForm.jsx";
import SerchForm from "components/TodoList/components/SerchForm/SerchForm";
import TodosItems from "components/TodoList/components/TodosItems/TodosItems";

const TodoList = ({ title }) => {
  const [serchValue, setSerchValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const category = title.toLowerCase();
    firebase.ref(`/${TODOS}/${category}`).on("value", (snapshot) => {
      const todosArr = [];
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const data = childSnapshot.val();
        todosArr.push({ key, ...data });
      });
      setTodos(todosArr);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotCompletedTasks = () => todos.filter((todo) => !todo.completed);

  const getCompletedTasks = () => todos.filter((todo) => todo.completed);

  const getFilteredTasksByName = (todos, serchValue) =>
    todos.filter((el) =>
      el.title.toLowerCase().includes(serchValue.toLowerCase())
    );

  return (
    <div className={styles.wrapper}>
      <div>
        <SerchForm serchValue={serchValue} setSerchValue={setSerchValue} />
        <div className={styles.tasksWrapper}>
          <section className={styles.unfinishedTasks}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.todos}>
              <TodosItems
                items={getFilteredTasksByName(
                  getNotCompletedTasks(),
                  serchValue
                )}
              />
            </div>
            <AddNewTaskForm />
          </section>
          <section className={styles.completedTasks}>
            <h2
              className={clsx(styles.completedTitle, {
                [styles.completedTitileTrue]: getCompletedTasks().length !== 0,
              })}
            >
              COMPLETED TASKS
            </h2>
            <TodosItems
              items={getFilteredTasksByName(getCompletedTasks(), serchValue)}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
