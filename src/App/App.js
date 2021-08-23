import React, { useState, useEffect } from 'react'
import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Logo from '../images/logo.jpg';
import BWMain from "../components/BWMain";
import BWWarning from "../components/BWWarning";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})


function App() {
  
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme} >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Container >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <img src={Logo} style={{width:'250px', height:'250px'}}/>
          </div>
          <BWMain />
          
          <BWWarning open2={true}/>
        </Container>
      </div>

      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
