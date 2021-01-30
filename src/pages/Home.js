import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useUser } from "../contexts/UserContext";
import "./Home.css";
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
    <div className="HomeBackground">
      <h1>ProgresApp</h1>
      <h2>{user.name}</h2>
      <button onClick={() => signOut()}>Salir</button>
    </div>
  );
};

export default Home;
