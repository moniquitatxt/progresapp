import React, { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import { signOut } from "../firebase/functions";

const Home = () => {
  const user = useUser();

  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => signOut()} >Salir</button>
    </div>
  );
};

export default Home;
