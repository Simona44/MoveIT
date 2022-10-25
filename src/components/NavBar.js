import React from 'react'
import { NavLink } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavBar = () => {
  let activeStyle = {
    textDecoration: "none",
    fontWeight: 600,
    color: 'white'
  };
  let inactiveStyle = {
    textDecoration: "none",
    fontWeight: 400,
    color: 'white'
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" component="nav" color="primary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MoveIT
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>  
          <Button  sx={{ color: '#fff' }}>
            <NavLink 
              to="/"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              New Order
            </NavLink>
          </Button>
          <Button  sx={{ color: '#fff' }}>
            <NavLink 
              to="/orders"
              style={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              Previous Orders
            </NavLink>
          </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default NavBar;
