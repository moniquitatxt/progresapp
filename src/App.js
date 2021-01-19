import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Button } from '@material-ui/core';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    
    width: 250,

    '& label.Mui-focused': {
      color: '#475694',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#475694',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#b39490',
      },
      '&:hover fieldset': {
        borderColor: '#b39490',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#475694',
      },
    },
  },
})(TextField);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#475694"),
    backgroundColor: "#475694",
    width: 250,
    height: 45,
    '&:hover': {
      backgroundColor: "#475694",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className="title" />
      <div className="titlepc" />
      <form className="login">
      <CssTextField
        className={classes.margin}
        label="Correo UCAB"
        variant="outlined"
        id="custom-css-outlined-input-email"
      />
        <div className="appart">
          <CssTextField
            className={classes.margin}
            label="Contraseña"
            type="password"
            variant="outlined"
            id="custom-css-outlined-input-pass"
          />
        </div>
      </form>
      <ColorButton variant="contained" color="primary" className={classes.margin}>
        Ingresar
      </ColorButton>
    </div>
  );
}

export default App;
