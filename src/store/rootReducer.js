import { combineReducers } from "redux";
import { todosReducer } from "store/reducers/todosReducer";

const rootReducer = combineReducers({
  todos: todosReducer
})

export { rootReducer };
