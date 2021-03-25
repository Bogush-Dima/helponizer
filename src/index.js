import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Context} from 'context'

const Main = () => {
  const [user, setUser] = useState(null)

  return (
    <React.StrictMode>
    <Context.Provider value={{user, setUser}}>
      <App />
    </Context.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

reportWebVitals();
