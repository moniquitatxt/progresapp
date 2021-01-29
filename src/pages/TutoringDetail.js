import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoring } from "../firebase/functions";
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

const TutoringDetail = () => {
  const [tutoring, setTutoring] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const tutoring = await getTutoring(params.id);
    setTutoring(tutoring);
    setLoading(false);
  });

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default TutoringDetail;
