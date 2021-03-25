import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Context} from 'context'
import { userReducer } from "reducers/userReducer";

const Main = () => {
  const [user, dispatchUser] = useReducer(userReducer, '')

  return (
    <React.StrictMode>
    <Context.Provider value={{user, dispatchUser}}>
      <App />
    </Context.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

reportWebVitals();
