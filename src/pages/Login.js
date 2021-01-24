import React, { useState } from "react";
import titlepc from "../assets/title-loginpc.svg";
import "./Login.css";
import { TextField, Button } from "@material-ui/core";
import { userLogin } from "../firebase/functions";
import { useHistory } from "react-router-dom";

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

// Página de Inicio de Sesión
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  // Función llamada al cambiar el texto del input
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  // Función que inicia sesión al clickear el botón
  const login = async () => {
    if (user.email.trim() === "" || user.password.trim() === "") {
      alert("Ingresa tu correo y tu contraseña, por favor.");
      return;
    }

    try {
      await userLogin(user.email, user.password);
      alert("Inicio exitoso");
      history.push("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="cLogin">
      {/* Logo */}
      <div className="iLogo">
        <img src={titlepc} alt="logo" />
      </div>
      {/* Inputs */}
      <div className="cInputs">
        {/* TextField del correo */}
        <div className="tfMail">
          <TextField
            fullWidth
            label="Correo Ucab"
            variant="outlined"
            onChange={(e) => handleChangeText("email", e.target.value)}
          ></TextField>
        </div>
        {/* TextField de la contraseña */}
        <div className="tfPassword">
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            type="password"
            onChange={(e) => handleChangeText("password", e.target.value)}
          ></TextField>
        </div>
      </div>
      {/* Boton para ingresar */}
      <div className="bLogin">
        <Button variant="contained" fullWidth color="primary" onClick={login}>
          Ingresar
        </Button>
      </div>
    </div>
  );
};

export default Login;
