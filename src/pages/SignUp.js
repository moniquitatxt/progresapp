import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./SignUp.css";
import { studentSignUp } from "../firebase/functions";
import { useHistory } from "react-router-dom";

// Pantalla de registro
const SignUp = () => {
  // Estado inicial
  const initialData = {
    name: "",
    idDocument: "",
    email: "",
    phone: "",
    degree: "",
    password: "",
    confirm: "",
  };

  // States
  const [user, setUser] = useState(initialData);
  const [errorMessages, setErrorMessages] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

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

  // Función de registro del estudiante al clickear el botón
  const signUp = async () => {
    const errorMessages = initialData;

    // Borra los espacios al inicio y al final
    for (const property in user) {
      if (property !== "password" && property !== "confirm") {
        user[property] = user[property].trim();
      }
    }

    // Maneja los errores de inputs vacíos
    if (user.name === "") {
      errorMessages.name = "Ingresa tu nombre y apellido, por favor";
    }
    if (user.idDocument === "") {
      errorMessages.idDocument = "Ingresa tu cédula, por favor";
    }
    if (user.email === "") {
      errorMessages.email = "Ingresa tu correo, por favor";
    }
    if (user.degree === "") {
      errorMessages.degree = "Ingresa tu carrera, por favor";
    }
    if (user.password === "") {
      errorMessages.password =
        "Ingresa una contraseña de al menos 6 caracteres, por favor";
    }
    if (user.confirm === "") {
      errorMessages.confirm = "Repite tu contraseña, por favor";
    }

    // Verifica que todo input requerido esté lleno
    for (const property in user) {
      if (user[property] === "" && property !== "phone") {
        setErrorMessages(errorMessages);
        return;
      }
    }

    // Verifica que las contraseñas coincidan
    if (user.password !== user.confirm) {
      errorMessages.confirm =
        "Las contraseñas no coinciden, vuelve a intentarlo";
      setErrorMessages(errorMessages);
      return;
    }

    // Intenta registrar al usuario y lo redirecciona
    try {
      await studentSignUp(user);
      history.push("/home");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        errorMessages.email =
          "Ingresa una dirección de correo electrónico válida";
      } else if (error.code === "auth/email-already-in-use") {
        errorMessages.email =
          "Ya existe un usuario con esta dirección de correo, intenta nuevamente";
      } else if (error.code === "auth/weak-password") {
        errorMessages.password =
          "Ingresa una contraseña de al menos 6 caracteres, por favor";
      }
      // TODO: Pensar en cómo manejar el error de desconexión
      setErrorMessages(errorMessages);
    }
  };

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
          required
          error={errorMessages.name !== ""}
          helperText={errorMessages.name}
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
          required
          error={errorMessages.idDocument !== ""}
          helperText={errorMessages.idDocument}
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
          required
          error={errorMessages.email !== ""}
          helperText={errorMessages.email}
          onChange={(e) => handleChangeText("email", e.target.value)}
        ></TextField>
      </div>
      {/* TextField del teléfono TODO: Ver si se puede mejorar*/}
      <div>
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          error={errorMessages.phone !== ""}
          helperText={errorMessages.phone}
          onChange={(e) => handleChangeText("phone", e.target.value)}
        ></TextField>
      </div>
      {/* TODO: La carrera no se ingresará así al final */}
      <div>
        <TextField
          fullWidth
          label="Carrera"
          variant="outlined"
          required
          error={errorMessages.degree !== ""}
          helperText={errorMessages.degree}
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
          required
          error={errorMessages.password !== ""}
          helperText={errorMessages.password}
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
          required
          error={errorMessages.confirm !== ""}
          helperText={errorMessages.confirm}
          onChange={(e) => handleChangeText("confirm", e.target.value)}
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
