import { BrowserRouter, Route } from "react-router-dom";
import styles from "App.module.css";
import firebase from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";
import Main from "components/Main/Main";
import SideBar from "components/SideBar/SideBar";
import TodoList from "components/TodoList/TodoList";
import { useEffect, useState } from "react";

const App = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    firebase.ref(`/${TODOS}/${ALLCATEGORIESNAMES}`).on("value", (snapshot) => {
      const arr2 = [];
      snapshot.forEach((el) => {
        const value = el.val();
        arr2.push(value);
      });
      setArr(arr2);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper}>
          <SideBar />
          <Route exact path="/">
            <Main />
          </Route>
          {arr.map((value) => {
            const filteredValue = value.replaceAll(" ", "");
            return (
              <Route
                path={`/${filteredValue}`}
                render={() => {
                  return <TodoList title={`${value.toUpperCase()}`} />;
                }}
              />
            );
          })}
          <Route
            path="/work"
            render={() => {
              return <TodoList title="WORK" />;
            }}
          />
          <Route
            path="/private"
            render={() => {
              return <TodoList title="PRIVATE" />;
            }}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
