import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import "./Home.css";
import { getStudentTutorings } from "../firebase/functions";
import { Link } from "react-router-dom";

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
    <div className="cHomeBackground">
      <div className="cTitleHome">
        <h1>ProgresApp</h1>
        <p style={{ color: "#3c3b3e", fontSize: "20pt" }}>{user.name}</p>
      </div>
    </div>
  );
};

export default Home;
