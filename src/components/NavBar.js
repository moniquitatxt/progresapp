import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LogOutIcon from '@material-ui/icons/ExitToApp'
import { ReactComponent as BarLogo } from "../assets/bar-logo.svg";
import { ReactComponent as BarDarkMode } from "../assets/bar-darkmode.svg";
import DrawerIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import "./NavBar.css";

function NavBar() {
    const [open, setOpen] = useState(false)

    const handleDrawer = () => {
        setOpen(true)
    }
    return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" style={{marginRight:'5pt'}} onClick={handleDrawer}> 
            <DrawerIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <SvgIcon>
              <BarLogo />
            </SvgIcon>
          </IconButton>
          <p className="titulo"> ProgresApp </p>
          <div className="separador1"/>
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
      <Drawer
        anchor='left'
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="drawerContainer">
            <h1>Hoola</h1>
        </div>
      </Drawer>
    </>
    );
}

export default NavBar;