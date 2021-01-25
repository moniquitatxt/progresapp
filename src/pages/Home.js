import React from "react";
import { useUser } from "../contexts/UserContext";
import { signOut } from "../firebase/functions";

const Home = () => {
  const user = useUser();

  return (
    <div>
      <h1>Home Page</h1>
      <p>{user.name}</p>
      <button onClick={() => signOut()} >Salir</button>
    </div>
  );
};

export default Home;
