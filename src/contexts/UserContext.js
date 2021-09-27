import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wrongProgresApp, setWrongProgresApp] = useState(false);

  useEffect(() => {
    let unsubStudent = () => {};
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      unsubStudent();
      if (user) {
        try {
          setLoading(true);

          unsubStudent = db
            .collection("students")
            .doc(user.uid)
            .onSnapshot((doc) => {
              if (!doc.exists) {
                setWrongProgresApp(true);
                auth.signOut();
                return;
              }

              const userData = doc.data();
              setUser(userData);
              setLoading(false);
            });

          // const userDoc = await db.collection("students").doc(user.uid).get();

          // if (!userDoc.exists) {
          //   setWrongProgresApp(true);
          //   auth.signOut();
          //   return;
          // }

          // const userData = userDoc.data();
          // setUser(userData);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        //unsub2(); // Por si acaso antes el load false estaba fuera de todo
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Función del Snackbar
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setWrongProgresApp(false);
  };

  return (
    <UserContext.Provider value={user}>
      {!loading && children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={wrongProgresApp}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message="Estás intentando acceder con una cuenta de profesor"
        action={
          <a style={{ textDecoration: "none" }} href="https://progresapp-profesores.web.app/">
            <Button color="secondary" size="small">
              Ir a ProgresApp Profesores
            </Button>
          </a>
        }
      />
    </UserContext.Provider>
  );
};
