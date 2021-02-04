import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutorTutorings } from "../firebase/functions";
import { useHistory } from "react-router-dom";
import { LinearProgress, List, ListItem } from "@material-ui/core";

const MyTutoring = () => {
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);

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
