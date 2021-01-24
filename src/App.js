import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

//Tema
const theme = createMuiTheme({
  palette: {
    //Moradito clarito
    primary: {
      main: "#475694",
    },
    //Rojosado
    secondary: {
      main: "#d3485a",
    },
    //Rosado
    tertiary: {
      main: "#fb86bb",
    },
    //Cremita
    quaternary: {
      main: "#ffe4d4",
    },
    //Morado oscuro
    quinary: {
      main: "#232b4a",
    },
    //Marron claro
    sextarian: {
      main: "#b39490",
    },
    //Mostaza
    septenary: {
      main: "#fca976",
    },
  },
});

function App() {
  return (
    <div>
      {/* Tema */}
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            {/* Página de inicio de sesión */}
            {/* TODO: Al final el login será "/login" y el home "/"" */}
            <Route exact path="/">
              <Login />
            </Route>
            {/* Página de registro */}
            <Route path="/signup">
              <SignUp />
            </Route>
            {/* Página principal */}
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
