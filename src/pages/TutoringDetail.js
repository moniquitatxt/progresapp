import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringById } from "../firebase/functions";
import {
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { degrees } from "../degrees";
import { useParams } from "react-router-dom";

const TutoringDetail = () => {
  const [tutoring, setTutoring] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const params = useParams();

  useEffect(() => {
    getTutoring();
  });

  const getTutoring = async () => {
    setLoading(true);
    const tutoring = await getTutoringById(params.id);
    setTutoring(tutoring);
    setLoading(false);
  };

  return (
    <div>
      {!tutoring ? (
        <h1>Not Found</h1>
      ) : (
        <div>
          <h1>{tutoring.name}</h1>
          <h2>{tutoring.tutorName}</h2>
        </div>
      )}
    </div>
  );
};

export default TutoringDetail;
