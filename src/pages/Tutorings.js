import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringsByDegree } from "../firebase/functions";
import {
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import "./Tutorings.css"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
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
    <div className="cTutoring">
      <h1>Tutorías</h1>
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
      <List>
        {tutorings.map((tutoring) => (
          <ListItem key={tutoring.id} button divider>
            <ListItemText
              key={tutoring.id + "txt"}
              primary={tutoring.name}
              secondary={tutoring.tutorName}
            />
            <ListItemSecondaryAction key={tutoring.id + "sec"}>
              <IconButton
                edge="end"
                aria-label="arrow"
                key={tutoring.id + "ico"}
              >
                <ArrowForwardIcon key={tutoring.id + "arr"} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Tutorings;
