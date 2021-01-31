import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import "./Home.css";
import { signOut, getStudentTutorings } from "../firebase/functions";
import { Link } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import CreateTutoring from "./CreateTutoring";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const Home = () => {
  const user = useUser();
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    setLoading(true);
    return getStudentTutorings(user.uid, (tutorings) => {
      setTutorings(tutorings);
      setLoading(false);
    });
  }, [user.uid]);

  return (
    <div className="HomeBackground">
      <h1>ProgresApp</h1>
      <h2>{user.name}</h2>

      {/* TODO: OJO el hecho de lo haya puesto aquí no significa que sea su lugar, es una prueba */}
      <Dialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        aria-labelledby="create-dialog-title"
      >
        <DialogTitle id="create-dialog-title">Nueva Tutoría</DialogTitle>
        <DialogContent>
          <CreateTutoring />
        </DialogContent>
      </Dialog>

      {/* TODO: Lo mismo con esto */}
      <Fab color="primary" aria-label="add" onClick={() => setShowCreate(true)}>
        <AddIcon />
      </Fab>

      <button onClick={() => signOut()}>Salir</button>
    </div>
  );
};

export default Home;
