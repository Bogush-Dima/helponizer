import { AUTHORIZATION, HOME } from "constants/constants";
import { Context } from "utils/context";
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, publicRoutes } from "utils/routes";

export const App = () => {
  const { user, isLoading } = useContext(Context);

  return !isLoading ? (
    user ? (
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
    )
  ) : (
    <div />
  );
};
