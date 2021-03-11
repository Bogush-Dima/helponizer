import { BrowserRouter, Route } from "react-router-dom";
import styles from "App.module.css";
import Main from "components/Main/Main";
import SideBar from "components/SideBar/SideBar";
import TodoList from "components/TodoList/TodoList";

const App = () => {
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
