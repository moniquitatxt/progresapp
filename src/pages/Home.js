import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { signOut, getStudentTutorings } from "../firebase/functions";

const Home = () => {
  const user = useUser();

  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return getStudentTutorings(user.uid, (tutorings) => {
      setTutorings(tutorings);
      setLoading(false);
    });
  }, [user.uid]);

  return (
    <div>
      <h1>Home Page</h1>
      <p>{user.name}</p>
      <button onClick={() => signOut()}>Salir</button>
    </div>
  );
};

export default Home;
