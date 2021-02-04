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
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  LinearProgress,
} from "@material-ui/core";
import "./Tutorings.css";
import ArrowForwardIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { degrees } from "../degrees";
import Divider from "@material-ui/core/Divider";
import TutoringIcon from "@material-ui/icons/MenuBook";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Juéves",
  "Viernes",
  "Sábado",
  "Domingo",
];

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
      <div>
        <LinearProgress color="secondary" />
      </div>
      <div className="cTitleTutoring">
        <p style={{ fontSize: "30pt", color: "#3c3b3e", fontWeight: "bold" }}>
          Tutorías
        </p>
      </div>
      <TextField
        select
        label="Seleccionar Carrera"
        variant="outlined"
        onChange={(e) => handleChangeDegree(e)}
        value={degree}
        style={{ width: "200pt" }}
      >
        {degrees.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <div className="divTutoring">
        <Divider />
      </div>
      {!loading && (
        <div className="cListTutoring">
          <List>
            {tutorings.map((tutoring) => (
              <ListItem
                key={tutoring.id}
                button
                divider
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5pt",
                  marginBottom: "10pt",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                component={Link}
                to={"/tutorias/" + tutoring.id}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#d3485a40" }}>
                    <TutoringIcon style={{ color: "#d3485a" }} />
                  </Avatar>
                </ListItemAvatar>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginRight: "7pt" }}
                />
                <ListItemText
                  key={tutoring.id + "txt"}
                  primary={tutoring.name}
                  secondaryTypographyProps={{ align: "left" }}
                  secondary={`${tutoring.tutor.name}\n${
                    days[tutoring.day]
                  } ${format(tutoring.startTime, "p")} - ${format(
                    tutoring.endingTime,
                    "p"
                  )}`}
                  style={{ whiteSpace: "pre" }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default Tutorings;
