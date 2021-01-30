import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringById } from "../firebase/functions";
import {
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { degreeSubjects } from "../degrees";
import { useParams } from "react-router-dom";

const CreateTutoring = () => {
  // Estado inicial
  const initialData = {
    subjectID: "",
    day: "",
    startTime: "",
    endingTime: "",
    classRoom: "",
    groupLink: "",
  };

  // States
  const [tutoring, setTutoring] = useState({ ...initialData });
  const [errorMessages, setErrorMessages] = useState({ ...initialData });

  const user = useUser();

  const subjects = degreeSubjects(user.degree);

  // Función llamada al cambiar el texto del input
  const handleChangeText = (name, value) => {
    setTutoring({ ...tutoring, [name]: value });
  };

  return (
    <div>
      <h1>Crear Tutoría</h1>
      {/* TODO: Recordar que pueden cambiar el orden de los input a lo que quede mejor */}
      {/* Select de la materia */}
      <div>
        <TextField
          fullWidth
          select
          label="Seleccionar Curso"
          variant="outlined"
          required
          error={errorMessages.subjectID !== ""}
          helperText={errorMessages.subjectID}
          onChange={(e) => handleChangeText("subjectID", e.target.value)}
          value={tutoring.subjectID}
        >
          {subjects.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default CreateTutoring;
