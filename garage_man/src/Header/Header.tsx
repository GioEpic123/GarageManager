import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
//import {Link} from 'react-router-dom';
const Header=()=>{
  return(
    <Box sx={{ display: 'flex-end' }}>
        <CssBaseline />
        {/* start of AppBar */}
        <AppBar  position="static" component="nav" elevation={0}>
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
                    {/*<Link style={{fontFamily: "Poppins",textDecoration: "none", color: "black"}} to={'/Home'}>Home</Link>*/}
                </Button>
              </Box>
          </Toolbar>
        </AppBar>
      </Box>
  )
}
export default Header;