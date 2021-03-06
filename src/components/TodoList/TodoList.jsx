import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./TodoList.module.css";
import { fireData } from "utils/firebase.js";
import { TODOS } from "constants/constants";
import AddNewTaskForm from "components/TodoList/components/AddNewTaskForm/AddNewTaskForm.jsx";
import SerchForm from "components/TodoList/components/SerchForm/SerchForm";
import TodosItems from "components/TodoList/components/TodosItems/TodosItems";

export const TodoList = ({ title, userName }) => {
  const path = decodeURI(window.location.pathname.slice(1));
  const [serchValue, setSerchValue] = useState("");
  const [todos, setTodos] = useState([]);
  const completedTasks = useMemo(() => todos.filter((todo) => todo.completed), [todos])
  const notCompletedTasks = useMemo(() => todos.filter((todo) => !todo.completed), [todos])

  useEffect(() => {
    fireData.ref(`/${userName}/${TODOS}/${path}`).on("value", (snapshot) => {
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

  const getFilteredTasksByName = (todos, serchValue) =>
    todos.filter((el) =>
      el.title.toLowerCase().includes(serchValue.toLowerCase())
    );

  return (
    <div className={styles.wrapper}>
      <div>
        <SerchForm serchValue={serchValue} setSerchValue={setSerchValue} />
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.tasksWrapper}>
          <section className={styles.unfinishedTasks}>
            <h2 className={styles.subTitle}>DURING</h2>
            <div className={styles.todos}>
              <TodosItems
                items={getFilteredTasksByName(
                  notCompletedTasks,
                  serchValue
                )}
              />
            </div>
            <AddNewTaskForm userName={userName} />
          </section>
          <section className={styles.completedTasks}>
            <h2
              className={clsx(styles.subTitle, styles.completedTitle, {
                [styles.completedTitileTrue]: completedTasks.length !== 0,
              })}
            >
              COMPLETED TASKS
            </h2>
            <TodosItems
              items={getFilteredTasksByName(completedTasks, serchValue)}
            />
          </section>
        </div>
      </div>
    </div>
  );
};