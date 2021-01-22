import React from "react";
import titlepc from "./title.svg";
import "./App.css";
import { TextField, Button, Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

/*const CssTextField = withStyles({        //Editar estilos de TextField
  root: {
    
    width: 250,

    '& label.Mui-focused': { //color del label cuando se haga clck
      color: '#475694',
    },
    '& .MuiOutlinedInput-root': {    //color del borde del textfield
      '& fieldset': {
        borderColor: '#b39490',
      },
      '&:hover fieldset': {        //color del borde del textfield cuando el mouse este encima
        borderColor: '#b39490',
      },
      '&.Mui-focused fieldset': {   //color del borde del textfield cuando se clickea
        borderColor: '#475694',
      },
    },
  },
})(TextField);*/

// const ColorButton = withStyles((theme) => ({
//   //estilos del boton
//   root: {
//     color: theme.palette.getContrastText("#475694"),
//     backgroundColor: "#475694",
//     width: 250,
//     height: 45,
//     "&:hover": {
//       //cuando el mouse este encima del boton, o en su defecto lo clickee
//       backgroundColor: "#232b4a",
//     },
//   },
// }))(Button);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#475694",
    },
    secondary: {
      main: "#d3485a",
    },
    tertiary: {
      main: "#fb86bb",
    },
    quaternary: {
      main: "#ffe4d4",
    },
    quinary: {
      main: "#232b4a",
    },
    sextarian: {
      main: "#b39490",
    },
    septenary: {
      main: "#fca976",
    },
  },
});

function App() {
  return (
    <div className="app">
      <div className="cLogin">
        {/* Logo */}
        <div className="iLogo">
          <img src={titlepc} />
        </div>
        <ThemeProvider theme={theme}>
          {/* Inputs */}
          <div className="cInputs">
            <div className="tfMail">
              <TextField
                fullWidth
                label="Correo Ucab"
                variant="outlined"
              ></TextField>
            </div>
            <div className="tfPassword">
              <TextField
                fullWidth
                label="Contraseña"
                variant="outlined"
              ></TextField>
            </div>
          </div>
          {/* Button */}
          <div className="bLogin">
            <Button variant="contained" color="primary">
              Ingresar
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
