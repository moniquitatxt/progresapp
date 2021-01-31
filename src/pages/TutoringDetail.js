import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringById, joinTutoring } from "../firebase/functions";
import {
  Button,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { degrees } from "../degrees";
import { useParams } from "react-router-dom";
import { format, compareAsc } from "date-fns";

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Juéves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const TutoringDetail = () => {
  const [tutoring, setTutoring] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const params = useParams();

  useEffect(() => {
    getTutoring();
  }, []);

  const getTutoring = async () => {
    const tutoring = await getTutoringById(params.id);
    setTutoring(tutoring);
    setLoading(false);
  };

  const join = async () => {
    if (tutoring.students.length === 15) {
      // TODO: Ver de qué forma colocamos este diálgo
      alert("Está lleno mi helmano");
      return;
    }

    try {
      await joinTutoring(tutoring, user);
      alert("TE UNISTE");
    } catch (error) {
      console.log(error);
      // TODO: Colocar de alguna forma el error
    }
  };

  // TODO: Obviamente la dorma forma de mostrar la carga será diferente
  if (loading) {
    return (
      <div>
        <h1>Cargando</h1>
      </div>
    );
  }

  return (
    <div>
      {/* TODO: Obviamente la forma de mostrar este error será diferente */}
      {!tutoring ? (
        <h1>Not Found</h1>
      ) : (
        <div>
          <h1>{tutoring.name}</h1>
          <h2>{tutoring.tutor.name}</h2>
          <h3>Horario</h3>
          <h4>{`${days[tutoring.day]} ${format(
            tutoring.startTime,
            "p"
          )} - ${format(tutoring.endingTime, "p")}`}</h4>
          <h3>Estudiantes</h3>
          <h4>{`${tutoring.students.length}/15`} </h4>
          <h3>Salón</h3>
          <h4>{tutoring.classRoom}</h4>
          {tutoring.studentsIDs.includes(user.uid)}
          {tutoring.degrees.includes(user.degree) &&
            tutoring.tutor.id !== user.uid &&
            !tutoring.studentsIDs.includes(user.uid) && (
              <div className="bLogin">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={join}
                >
                  Unirse
                </Button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default TutoringDetail;
