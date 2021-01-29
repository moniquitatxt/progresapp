import React from "react";
import { Fragment } from "react";
import { useUser } from "../contexts/UserContext";
import { signOut } from "../firebase/functions";
import "./Home.css";
import NavBar from "../components/NavBar";


const Home = () => {
  const user = useUser();


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
