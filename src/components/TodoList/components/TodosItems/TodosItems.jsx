import TodoItem from "components/TodoList/components/TodoItem/TodoItem";

const TodosItems = ({ items, toggleTask, deleteTask }) => {
  return (
    <>
      {items.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </>
  );
};

export default TodosItems;
