import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringsByDegree } from "../firebase/functions";

const Tutorings = () => {
  const user = useUser();
  const [tutorings, setTutorings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [degree, setDegree] = useState(user.degree);

  useEffect(() => {
    setLoading(true);
    return getTutoringsByDegree(degree, (tutorings) => {
      setTutorings(tutorings);
      setLoading(false);
    });
  }, [degree]);

  return (
    <div>
      <h1>Lista de Tutorías</h1>
    </div>
  );
};

export default Tutorings;
