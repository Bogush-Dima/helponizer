import { useState } from "react";
import { fireData, fireAuth } from "utils/firebase.js";
import { TODOS } from "constants/constants";
import clsx from "clsx";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todo: { key, title, completed, category } }) => {
  const [userName] = useState(fireAuth.currentUser.displayName)

  const toggleTask = () => {
    fireData.ref(`/${userName}/${TODOS}/${category}`).child(key).update({
      completed: !completed,
    });
  };

  const deleteTask = () => {
    fireData.ref(`/${userName}/${TODOS}/${category}`).child(key).remove();
  };

  return (
    <label className={styles.item}>
      <input
        className={styles.check}
        type="checkbox"
        checked={completed}
        onChange={toggleTask}
      />
      <span className={styles.fake} />
      <span className={clsx(styles.text, { [styles.done]: completed })}>
        {title}
      </span>
      <button className={styles.deleteBtn} onClick={deleteTask}>
        &times;
      </button>
    </label>
  );
};

export default TodoItem;
