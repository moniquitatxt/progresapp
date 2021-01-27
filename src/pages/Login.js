import React, { useState } from "react";
import titlepc from "../assets/title-loginpc.svg";
import "./Login.css";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { studentLogin } from "../firebase/functions";
import { Link } from "react-router-dom";

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

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Función llamada al cambiar el texto del input
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  // Función para cambiar visibilidad de la contraseña
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Función del icono de de visibilidad
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // Función que inicia sesión al clickear el botón
  const login = async () => {
    // Verifica que los input estén llenos
    if (user.email.trim() === "" || user.password === "") {
      setErrorMessage("Ingresa tu correo y tu contraseña, por favor");
      return;
    }

    // Inicia sesión
    try {
      await studentLogin(user.email.trim(), user.password);
    } catch (error) {
      let message;
      if (error.code === "auth/invalid-email") {
        message = "Ingresa una dirección de correo electrónico válida";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        message = "Correo o contraseña inválidos, intenta nuevamente";
      } else {
        message = "Se produjo un error desconocido";
      }
      setErrorMessage(message);
    }
  };

  return (
    <div className="cLogin">
      {/* Logo */}
      <div className="cHeader">
        <img src={titlepc} alt="logo" />
      </div>
      {/* Inputs */}
      <div className="cInputs">
        {/* Mensaje de error */}
        {errorMessage && <p>{errorMessage}</p>}
        {/* TextField del correo */}
        <div className="tfMail">
          <TextField
            fullWidth
            label="Correo"
            variant="outlined"
            type="email"
            error={errorMessage !== ""}
            onChange={(e) => handleChangeText("email", e.target.value)}
          ></TextField>
        </div>
        {/* TextField de la contraseña */}
        <div className="tfPassword">
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            error={errorMessage !== ""}
            onChange={(e) => handleChangeText("password", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
      </div>
      {/* Boton para ingresar */}
      <div className="bLogin">
        <Button variant="contained" fullWidth color="primary" onClick={login}>
          Ingresar
        </Button>
      </div>
      <div className="cBSignUp">
        <Link to="/signup" className="bSignUp">
          ¿No tienes cuenta? ¡Registrate aquí!
        </Link>
      </div>
    </div>
  );
};

export default Login;
