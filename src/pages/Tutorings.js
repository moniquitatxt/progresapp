import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringsByDegree } from "../firebase/functions";

const Tutorings = () => {
  const user = useUser();
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    return getTutoringsByDegree(user.degree, (tutorings) => {
      setTutorings(tutorings);
      setLoading(false);
    });
  }, [user.degree]);

  return (
    <div>
      <h1>Lista de Tutorías</h1>
    </div>
  );
};

export default Tutorings;
