import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutorTutorings } from "../firebase/functions";
import { useHistory } from "react-router-dom";
import { LinearProgress, List, ListItem } from "@material-ui/core";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import CreateTutoring from "../components/CreateTutoring";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const MyTutoring = () => {
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const user = useUser();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    // TODO: Poner esto cuando sea posible asignar tutores
    // if (!user.isTutor) {
    //   history.replace("/");
    // }

    return getTutorTutorings(user.uid, (tutorings) => {
      setTutorings(tutorings);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div>{loading && <LinearProgress color="secondary" />}</div>
      <div>
        <h1>Mis tutorías</h1>
      </div>
      <Dialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        aria-labelledby="create-dialog-title"
      >
        <DialogTitle id="create-dialog-title">Nueva Tutoría</DialogTitle>
        <DialogContent>
          <CreateTutoring close={() => setShowCreate(false)} />
        </DialogContent>
      </Dialog>

      {/* TODO: Colocarlo en un lugar correcto como la esquina */}
      <Fab color="primary" aria-label="add" onClick={() => setShowCreate(true)}>
        <AddIcon />
      </Fab>

      {!loading &&
        (!tutorings ? (
          <div>
            <p>Aún no has publicado tutorías</p>
          </div>
        ) : (
          <div>
            <p>Las tutos van aquí</p>
            <div className="cListTutoring">
              <List>
                {tutorings.map((tutoring) => (
                  <ListItem>
                    <h2>{tutoring.name}</h2>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyTutoring;
