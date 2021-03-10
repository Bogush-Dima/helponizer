import { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from 'firebase.js'
import styles from "App.module.css";
import Main from "components/Main/Main";
import SideBar from "components/SideBar/SideBar";
import TodoList from "components/TodoList/TodoList";

const App = () => {
  const todos = useSelector(store => store.todos)
  const firebaseTodos = firebase.ref('/todos')
  
  useEffect(() => {
    firebaseTodos.push(todos);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const getTodosByCategory = (category) =>
    todos.filter((todo) => todo.category === category);

  return (
    <BrowserRouter>
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <SideBar />
          <Route exact path="/">
            <Main />
          </Route>
          <Route
            path="/work"
            render={() => {
              return (
                <TodoList
                  title="WORK"
                  todos={getTodosByCategory('work')}
                />
              );
            }}
          />
          <Route
            path="/private"
            render={() => {
              return (
                <TodoList
                  title="PRIVATE"
                  todos={getTodosByCategory('private')}
                />
              );
            }}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
