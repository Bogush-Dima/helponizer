import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Context } from "context";
import { BrowserRouter } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth'
import { fireAuth } from "firebase.js";

const Main = () => {
  const [user, isLoading] = useAuthState(fireAuth);

  console.log(useAuthState(fireAuth))

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Context.Provider value={{ user, isLoading }}>
          <App />
        </Context.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

reportWebVitals();
