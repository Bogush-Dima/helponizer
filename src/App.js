import { BrowserRouter, Route } from "react-router-dom";
import styles from "App.module.css";
import { fireData, fireAuth } from "firebase.js";
import { TODOS, ALLCATEGORIESNAMES } from "firebaseConstants";
import Main from "components/Main/Main";
import SideBar from "components/SideBar/SideBar";
import TodoList from "components/TodoList/TodoList";
import { useEffect, useState } from "react";
import { Autorization } from "components/Autorization/Autorization";

const App = () => {
  const [arr, setArr] = useState([]);
  const [user, setUser] = useState(fireAuth.currentUser);

  useEffect(() => {
    if (user) {
      fireData
        .ref(`/${user.displayName}/${TODOS}/${ALLCATEGORIESNAMES}`)
        .on("value", (snapshot) => {
          const arr2 = [];
          snapshot.forEach((el) => {
            const key = el.key;
            const value = el.val();
            arr2.push({ key, value });
          });
          setArr(arr2);
        });
    }
  }, [user]);

  return (
    <BrowserRouter>
      <div className={styles.mainWrapper}>
        {user ? (
          <div className={styles.wrapper}>
            <SideBar userName={user.displayName} setUser={setUser} />
            <Route exact path="/">
              <Main />
            </Route>
            {arr.map(({ key, value }) => {
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
        ) : (
          <Autorization setUser={setUser} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
