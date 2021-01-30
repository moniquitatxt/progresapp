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
} from "@material-ui/core";
import "./Tutorings.css"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { degrees } from "../degrees";
import Divider from '@material-ui/core/Divider';
import TutoringIcon from '@material-ui/icons/MenuBook'


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
      <div className="cTitleTutoring">
        <p style={{fontSize: '30pt', color: "#000", fontWeight: "bold"}}>Tutorías</p>
      </div>
      <TextField
        select
        label="Seleccionar Carrera"
        variant="outlined"
        onChange={(e) => handleChangeDegree(e)}
        value={degree}
        style={{ width: '200pt'}}
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
      <div className="cListTutoring">
        <List>
          {tutorings.map((tutoring) => (
            <ListItem key={tutoring.id} button divider style={{backgroundColor: "#fff", borderRadius: '5pt', marginBottom: '5pt'}}>
              <div className="cIconList">
                <ListItemIcon>
                  <TutoringIcon/>
                </ListItemIcon>
              </div>
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
    </div>
  );
};

export default Tutorings;
