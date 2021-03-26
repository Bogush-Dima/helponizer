import React from "react";
import { Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import styles from "./Application.module.css";
import { fireData } from "utils/firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "constants/constants";
import { Main } from "components/Main/Main";
import { SideBar } from "components/SideBar/SideBar";
import { TodoList } from "components/TodoList/TodoList";
import { Header } from "components/Header/Header";
import { Context } from "utils/context";
import { HOME } from "constants/constants";

export const Application = () => {
  const [flagApp, setFlagApp] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const { user } = useContext(Context);

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
    <div className={styles.mainWrapper}>
      <>
        <Header />
        <div className={styles.wrapper}>
          <SideBar flagApp={flagApp} setFlagApp={setFlagApp} />
          <Route exact path={HOME}>
            <Main />
          </Route>
          {todoLists.map(({ key, value }) => {
            const filteredValue = value.replaceAll(" ", "");
            return (
              <Route
                key={key}
                path={`${HOME}/${filteredValue}`}
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
    </div>
  );
};
