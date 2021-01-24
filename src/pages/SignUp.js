import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./SignUp.css";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    idDocument: "",
    email: "",
    phone: "",
    degree: "",
    password: "",
    confirm: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Función llamada al cambiar el texto del input
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const signUp = () => {};

  return (
    <div>
      {/* TODO: Obviamente agregar estilos */}
      {/* TODO: Se puede cambiar el orden de los input como quede mejor */}
      {/* TextField del nombre */}
      <div>
        <TextField
          fullWidth
          label="Nombre y Apellido"
          variant="outlined"
          error={errorMessage}
          onChange={(e) => handleChangeText("name", e.target.value)}
        ></TextField>
      </div>
      {/* TextField de la cédula */}
      <div>
        <TextField
          fullWidth
          // TODO: Considerar agregar "de identidad"
          label="Cédula"
          variant="outlined"
          error={errorMessage}
          onChange={(e) => handleChangeText("idDocument", e.target.value)}
        ></TextField>
      </div>
      {/* TextField del correo */}
      <div>
        <TextField
          fullWidth
          label="Correo"
          variant="outlined"
          type="email"
          error={errorMessage}
          onChange={(e) => handleChangeText("email", e.target.value)}
        ></TextField>
      </div>
      {/* TextField del teléfono TODO: Ver si se puede mejorar*/}
      <div>
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          error={errorMessage}
          onChange={(e) => handleChangeText("phone", e.target.value)}
        ></TextField>
      </div>
      {/* TODO: La carrera no se ingresará así al final */}
      <div>
        <TextField
          fullWidth
          label="Carrera"
          variant="outlined"
          error={errorMessage}
          onChange={(e) => handleChangeText("degree", e.target.value)}
        ></TextField>
      </div>
      {/* TextField de la contraseña */}
      <div>
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          error={errorMessage}
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
      {/* TextField de repetir contraseña */}
      <div>
        <TextField
          fullWidth
          label="Repetir Contraseña"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          error={errorMessage}
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
      {/* Boton para registrarse */}
      <div>
        <Button variant="contained" fullWidth color="primary" onClick={signUp}>
          Registrarse
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
