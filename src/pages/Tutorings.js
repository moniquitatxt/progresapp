import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringsByDegree } from "../firebase/functions";
import { TextField, MenuItem } from "@material-ui/core";
import { degrees } from "../degrees";

const Tutorings = () => {
  const user = useUser();
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [degree, setDegree] = useState(user.degree);

  useEffect(() => {
    setLoading(true);
    return getTutoringsByDegree(degree, (tutorings) => {
      setTutorings(tutorings);
      setLoading(false);
    });
  }, [degree]);

  const handleChangeDegree = (e) => {
    setDegree(e.target.value);
  };

  return (
    <div>
      <h1>Lista de Tutorías</h1>
      <TextField
        select
        label="Seleccionar Carrera"
        variant="outlined"
        onChange={(e) => handleChangeDegree(e)}
        value={degree}
      >
        {degrees.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <h2>{degree}</h2>
    </div>
  );
};

export default Tutorings;
