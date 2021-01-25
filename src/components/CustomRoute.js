import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const CustomRoute = ({ children, needsAuth, ...rest }) => {
  const user = useUser();
  console.log(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (needsAuth ? user : !user) ? (
          children
        ) : (
          <Redirect
            exact 
            to={{
              pathname: needsAuth ? "/login" : "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default CustomRoute;
