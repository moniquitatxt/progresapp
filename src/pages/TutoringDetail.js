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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { degrees } from "../degrees";
import { useParams } from "react-router-dom";
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

const TutoringDetail = () => {
  const [tutoring, setTutoring] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStudents, setShowStudents] = useState(false);

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

  if (loading) {
    return (
      <div>
        {/* TODO: Le pueden cambiar el color si lo desean o el tipo de loader */}
        <LinearProgress color="secondary" />
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
          {tutoring.studentsIDs.includes(user.uid) ? (
            <h3 onClick={() => setShowStudents(true)}>Ver Estudiantes</h3>
          ) : (
            <h3>Estudiantes</h3>
          )}

          <Dialog
            open={showStudents}
            onClose={() => setShowStudents(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Estudiantes</DialogTitle>
            <DialogContent>
              {tutoring.students.map((student) => (
                <DialogContentText key={student.name}>
                  {student.name}
                </DialogContentText>
              ))}
            </DialogContent>
          </Dialog>

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
