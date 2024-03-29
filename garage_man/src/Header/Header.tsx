import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState } from 'react';

const app = initializeApp({
  apiKey: "AIzaSyDSuLNYYqcUF8xpXHxI6Ijz8tILwshovZI",
  authDomain: "garageman-d75af.firebaseapp.com",
  projectId: "garageman-d75af",
  storageBucket: "garageman-d75af.appspot.com",
  messagingSenderId: "743378172343",
  appId: "1:743378172343:web:2b06e5c4dbb4ccae6f5032",
  measurementId: "G-KQZ7V1ZYJG",
});
const auth = getAuth(app);

const Header=()=>{
  const [imageSrc, setImageSrc] = useState(localStorage.getItem("pic"))
  return(
    <Box sx={{ display: 'flex-end' }}>
        <CssBaseline />
        {/* start of AppBar */}
        <AppBar  position="static" component="nav" elevation={0} sx={{backgroundColor:'#481829', opacity:0.9}}>
          <Toolbar>
          <Box justifyContent="flex-end" 
            alignItems="flex-end"
            sx={{ flexGrow: 1, 
                display: { xs: 'none', md: 'flex' }
                }}>
              <Button
                 
                  sx={{
                    fontSize: "18px",
                    color: "#000000",
                    marginLeft: "10px"
                  }}
                  variant="text"
                >
                    <Link style={{fontFamily: "Poppins",textDecoration: "none", color: "#E6E6E6"}} to={'/Home'}>Home</Link>
                </Button>
                <Button
                 
                  sx={{
                    fontSize: "18px",
                    color: "#000000",
                    marginLeft: "10px"
                  }}
                  variant="text"
                >
                    <Link style={{fontFamily: "Poppins",textDecoration: "none", color: "#E6E6E6"}} to={'/Tickets'}>Tickets</Link>
                </Button>
                <Button
                 
                  sx={{
                    fontSize: "18px",
                    color: "#000000",
                    marginLeft: "10px"
                  }}
                  variant="text"
                >
                    <Link style={{fontFamily: "Poppins",textDecoration: "none", color: "#E6E6E6"}} to={'/Vehicles'}>Vehicles</Link>
                </Button>
                <Button
                 
                sx={{
                  fontSize: "18px",
                  color: "#000000",
                  marginLeft: "10px"
                }}
                variant="text"
                onClick={() => auth.signOut()}
              >
                  <Link style={{fontFamily: "Poppins",textDecoration: "none", color: "#E6E6E6"}} to={'/'}>Sign Out</Link>
              </Button>
              </Box>
              <div>
                <img src={localStorage.getItem("pic")}   
                  style={{marginLeft: "5px", width: 50, height: 50, borderRadius: 400/ 2}} 
                />
              </div>
          </Toolbar>
        </AppBar>
      </Box>
  )
}
export default Header;