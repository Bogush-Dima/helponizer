import React, { useState } from "react";
import clsx from "clsx";
import styles from "./TodoList.module.css";
import AddNewTaskForm from "components/TodoList/components/AddNewTaskForm/AddNewTaskForm.jsx";
import SerchForm from "components/TodoList/components/SerchForm/SerchForm";
import TodosItems from "components/TodoList/components/TodosItems/TodosItems";

const TodoList = ({ title, todos }) => {
  const [serchValue, setSerchValue] = useState("");

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
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.todos}>
          <TodosItems
            items={getFilteredTasksByName(getNotCompletedTasks(), serchValue)}
          />
        </section>
        <AddNewTaskForm />
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
  );
};

export default TodoList;
