import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styles from "App.module.css";
import { fireData } from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";
import Main from "components/Main/Main";
import SideBar from "components/SideBar/SideBar";
import TodoList from "components/TodoList/TodoList";
import { Autorization } from "components/Autorization/Autorization";
import { Header } from "components/Header/Header";
import { Context } from "context";

const App = () => {
  const [flagApp, setFlagApp] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const {user} = useContext(Context)

  useEffect(() => {
    if (user) {
      fireData
        .ref(`/${user.displayName}/${TODOS}/${ALLCATEGORIESNAMES}`)
        .on("value", (snapshot) => {
          const todoListsArr = [];
          snapshot.forEach((el) => {
            const key = el.key;
            const value = el.val();
            todoListsArr.push({ key, value });
          });
          setTodoLists(todoListsArr);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagApp]);

  return (
    <BrowserRouter>
        <div className={styles.mainWrapper}>
          {user ? (
            <>
              <Header />
              <div className={styles.wrapper}>
                <SideBar flagApp={flagApp} setFlagApp={setFlagApp} />
                <Route exact path="/">
                  <Main />
                </Route>
                {todoLists.map(({ key, value }) => {
                  const filteredValue = value.replaceAll(" ", "");
                  return (
                    <Route
                      key={key}
                      path={`/${filteredValue}`}
                      render={() => {
                        return (
                          <TodoList
                            title={`${value.toUpperCase()}`}
                            userName={user.displayName}
                          />
                        );
                      }}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <Autorization />
          )}
        </div>
    </BrowserRouter>
  );
};

export default App;
