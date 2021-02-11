import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { getTutoringById } from "../firebase/functions";
import {
  Button,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Divider,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";
import ScheduleIcon from "@material-ui/icons/QueryBuilderOutlined";
import { degrees } from "../degrees";
import { useParams, useHistory, Link } from "react-router-dom";
import { format } from "date-fns";
import "./TutoringDetail.css";
import StudentsIcon from "@material-ui/icons/PersonOutlined";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogoWhatsapp } from "react-ionicons";
import ContactIcon from "@material-ui/icons/MailOutline";
import EditIcon from "@material-ui/icons/Edit";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Juéves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const MyTutoringDetail = () => {
  const [tutoring, setTutoring] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useUser();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = getTutoringById(params.id, (tutoring) => {
      setTutoring(tutoring);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div>
        <LinearProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="cBackgroundTutoringDetail">
      {!tutoring ? (
        <div className="pTitlesTutoring">
          <p className="nTutoring" style={{ color: "#3c3b3e" }}>
            Tutoría no encontrada
          </p>
          <p className="nTutor" style={{ color: "#3c3b3e" }}>
            La tutoría que buscabas desafortunadamente ya no existe
          </p>
        </div>
      ) : (
        <div>
          <div className="pTitlesTutoring">
            <p className="nTutoring" style={{ color: "#3c3b3e" }}>
              {tutoring.name}
            </p>
          </div>
          <div className="cInfoTutoring">
            <Divider style={{ marginBottom: "10pt" }} />
            <List>
              <ListItem
                button
                divider
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5pt",
                  marginBottom: "10pt",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                component={Link}
                to={"/asistencia/" + tutoring.id}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#B3949040" }}>
                    <StudentsIcon style={{ color: "#B39490" }} />
                  </Avatar>
                </ListItemAvatar>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginRight: "7pt" }}
                />
                <ListItemText
                  primary="Asistencia"
                  secondary={`Estudiantes ${tutoring.students.length}/15`}
                  secondaryTypographyProps={{ align: "left" }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => history.push("/asistencia/" + tutoring.id)}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem
                divider
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5pt",
                  marginBottom: "10pt",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#fca97640" }}>
                    <ScheduleIcon style={{ color: "#fca976" }} />
                  </Avatar>
                </ListItemAvatar>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginRight: "7pt" }}
                />
                <ListItemText
                  primary="Horario"
                  secondary={`${days[tutoring.day]} ${format(
                    tutoring.startTime,
                    "p"
                  )} - ${format(tutoring.endingTime, "p")}`}
                  secondaryTypographyProps={{ align: "left" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem
                divider
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5pt",
                  marginBottom: "10pt",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#fb86bb40" }}>
                    <FontAwesomeIcon
                      icon={faChalkboard}
                      style={{ color: "#fb86bb" }}
                    />
                  </Avatar>
                </ListItemAvatar>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginRight: "7pt" }}
                />
                <ListItemText
                  primary="Aula"
                  secondary={tutoring.classRoom}
                  secondaryTypographyProps={{ align: "left" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem
                divider
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5pt",
                  marginBottom: "10pt",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: "#25d36640" }}>
                    <LogoWhatsapp color="#25d366" />
                  </Avatar>
                </ListItemAvatar>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginRight: "7pt" }}
                />
                <ListItemText
                  primary="Link del Grupo"
                  secondary={
                    tutoring.groupLink ? (
                      <a
                        // TODO: Asegurarme de ponerle el https luego al guardar en firebase
                        href={tutoring.groupLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tutoring.groupLink}
                      </a>
                    ) : (
                      "Ninguno"
                    )
                  }
                  secondaryTypographyProps={{ align: "left" }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutoringDetail;
