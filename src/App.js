import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "App.module.css";
import { fireData, fireAuth } from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";
import Main from "components/Main/Main";
import SideBar from "components/SideBar/SideBar";
import TodoList from "components/TodoList/TodoList";
import { Autorization } from "components/Autorization/Autorization";
import { Header } from "components/Header/Header";

export const Context = React.createContext()

const App = () => {
  const [flagApp, setFlagApp] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const [user, setUser] = useState('');

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
  }, [flagApp]);

  const context = {
    user,
    setUser,
    userName: user ? user.displayName : '',
    flagApp,
    setFlagApp
  };

  return (
    <BrowserRouter>
      <Context.Provider value={context}>
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
            <Autorization setUser={setUser} />
          )}
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
};

export default App;
