import { useDispatch } from "react-redux";
import clsx from "clsx";
import styles from "./TodoItem.module.css";
import { toggleTask, deleteTask } from "store/actions";

const TodoItem = ({ todo: { id, title, completed } }) => {
  const dispatch = useDispatch()
  return (
    <label className={styles.item}>
      <input
        className={styles.check}
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTask(id))}
      />
      <span className={styles.fake} />
      <span className={clsx(styles.text, { [styles.done]: completed })}>
        {title}
      </span>
      <button className={styles.deleteBtn} onClick={() => dispatch(deleteTask(id))}>
        &times;
      </button>
    </label>
  );
};

export default TodoItem;
