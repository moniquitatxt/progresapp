import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { useUser } from "../contexts/UserContext";
import "./Home.css";
import NavBar from "../components/NavBar";
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
    <>
    <div>
      <NavBar />
    </div>
    <div className="HomeBackground">
      
    </div>
    </>
  );
};

export default Home;
