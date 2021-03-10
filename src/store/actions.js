const { ADD_TODO, TOGGLE_TASK, DELETE_TASK } = require("./constants");

const addTodo = (value, path) => {
  return {
    type: ADD_TODO,
    payload: {value, path}
  }
}

const toggleTask = (id) => {
  return {
    type: TOGGLE_TASK,
    payload: id
  }
}

const deleteTask = (id) => {
  return {
    type: DELETE_TASK,
    payload: id
  }
}

export { addTodo, toggleTask, deleteTask };
