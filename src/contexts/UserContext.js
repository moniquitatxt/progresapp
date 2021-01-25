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
      // setLoading(true);
      if (user) {
        try {
          const userDoc = await db.collection("students").doc(user.uid).get();
          const userData = userDoc.data();
          setUser(userData);
        } catch (error) {
          console.log(error.message);
        }
      } else {
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
