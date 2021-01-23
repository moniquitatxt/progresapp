import React from "react";
import titlepc from "../assets/title-loginpc.svg";
import "./Login.css";
import { TextField, Button, Container } from "@material-ui/core";

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

const Login = () => {
  return (
    <div className="cLogin">
      {/* Logo */}
      <div className="iLogo">
        <img src={titlepc} />
      </div>
      {/* Inputs */}
      <div className="cInputs">
        {/* TextField del correo */}
        <div className="tfMail">
          <TextField
            fullWidth
            label="Correo Ucab"
            variant="outlined"
          ></TextField>
        </div>
        {/* TextField de la contraseña */}
        <div className="tfPassword">
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            type="password"
          ></TextField>
        </div>
      </div>
      {/* Boton para ingresar */}
      <div className="bLogin">
        <Button variant="contained" fullWidth color="primary">
          Ingresar
        </Button>
      </div>
    </div>
  );
};

export default Login;
