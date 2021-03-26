import { AUTHORIZATION, HOME } from "constants/constants";
import { Context } from "context";
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "routes";

const App = () => {
  const {user} = useContext(Context)

  return user ? (
    <Switch>
      {privateRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
      <Redirect to={HOME} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}
      <Redirect to={AUTHORIZATION} />
    </Switch>
  );
};

export default App;
