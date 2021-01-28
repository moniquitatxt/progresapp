import React from "react";
import { useUser } from "../contexts/UserContext";
import { signOut } from "../firebase/functions";
import "./Home.css";
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

const Home = () => {
  const user = useUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <SvgIcon>
          <svg width="24" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2.25275L18.2691 8.04552V19.6311L14 25.4238L9.73086 19.6311V8.04552L14 2.25275Z" fill="#FAF3F0"/>
            <path d="M23.4648 2.25275L27.3924 8.04552V19.6311L23.4648 25.4238L19.5372 19.6311V8.04552L23.4648 2.25275Z" fill="#FAF3F0"/>
            <path d="M4.53521 2.25275L8.46282 8.04552V19.6311L4.53521 25.4238L0.607603 19.6311V8.04552L4.53521 2.25275Z" fill="#FAF3F0"/>
            <line x1="4.73334" x2="4.73334" y2="6.11459" stroke="#FAF3F0" stroke-width="2"/>
            <line x1="14.0667" x2="14.0667" y2="6.11459" stroke="#FAF3F0" stroke-width="2"/>
            <line x1="23.4" x2="23.4" y2="6.11459" stroke="#FAF3F0" stroke-width="2"/>
            <line x1="23.4" y1="21.8854" x2="23.4" y2="28" stroke="#FAF3F0" stroke-width="2"/>
            <line x1="14.0667" y1="21.8854" x2="14.0667" y2="28" stroke="#FAF3F0" stroke-width="2"/>
            <line x1="4.73334" y1="21.8854" x2="4.73334" y2="28" stroke="#FAF3F0" stroke-width="2"/>
          </svg>
          </SvgIcon>
        </IconButton>
        <p className="titulo"> ProgresApp </p>
        <div className="separador1"/>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <SvgIcon>
           <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"></path>
          </SvgIcon>
        </IconButton>
        <IconButton color="inherit">
          <LogOutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    

  );
};

export default Home;
