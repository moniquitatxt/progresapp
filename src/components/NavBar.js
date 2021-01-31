import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LogOutIcon from "@material-ui/icons/ExitToApp";
import { ReactComponent as BarLogo } from "../assets/bar-logo.svg";
import BarDarkMode from "@material-ui/icons/Brightness4";
import DrawerIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import "./NavBar.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import EditT from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(true);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            style={{ marginRight: "5pt" }}
            onClick={handleDrawer}
          >
            <DrawerIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
          >
            <SvgIcon>
              <BarLogo />
            </SvgIcon>
          </IconButton>
          <Link className="titulo" to="/">
            ProgresApp
          </Link>
          <div className="separador1" />
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <SvgIcon>
              <BarDarkMode />
            </SvgIcon>
          </IconButton>
          <IconButton color="inherit">
            <LogOutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="drawerContainer">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/tutorias">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Buscar Tutorías" />
          </ListItem>
          <div className="tutorOptions">
            <Divider style={{ marginTop: "5pt", marginBottom: "5pt" }} />
            <ListItem button>
              <ListItemIcon>
                <EditT />
              </ListItemIcon>
              <ListItemText primary="Editar Tutorías" />
            </ListItem>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default NavBar;
