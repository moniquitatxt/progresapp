import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/config";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("HMMMM")
      if (user) {
        try {
          setLoading(true);
          console.log(loading);
          console.log("Usuario!")
          const userDoc = await db.collection("students").doc(user.uid).get();
          console.log(loading)
          const userData = userDoc.data();
          setUser(userData);
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log("No usuario")
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {!loading && children}
    </UserContext.Provider>
  );
};
