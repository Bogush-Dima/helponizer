import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Context } from "utils/context";
import { BrowserRouter } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth'
import { fireAuth } from "utils/firebase.js";
import {App} from "components/App/App";

const Main = () => {
  const [user, isLoading] = useAuthState(fireAuth);

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
