import { useEffect, useState } from 'react'
import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Menu_item from './menuitem';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  export default function BarraNavegacao_() {

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
  
    const [arquivo, setArquivo] = useState<string | null>(null);
  
    const savedArray = localStorage.getItem('vendedores');

    useEffect(() => {
      const savedArray = localStorage.getItem('vendedores');
      console.log("effect barra nevegacao");

    setArquivo(localStorage.getItem("logo"))
      if (savedArray) {
        try {
        
        }
        catch {
  
        }
      }
  
    }, []);


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  function logout(){
             
    signOut(auth).then(() => {
    // Sign-out successful.
        <Navigate to="/"/>
        console.log("Signed out successfully")
      //  localStorage.setItem("on","0");
        localStorage.clear();

    }).catch((error) => {
    // An error happened.
    });


}
    return(
      <>
<Box sx={{ padding: '50px' }}>

<AppBar>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box
          
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div className='w-1/2 h-auto'> 
          <img src='https://firebasestorage.googleapis.com/v0/b/pesquisa-ec906.appspot.com/o/logo_nova.png?alt=media&token=f18fd556-3dca-4684-9c21-bf2595ebb5bb'></img>
          </div>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          {localStorage.getItem('on') !== '0' && (
            <IconButton 
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
  )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <Menu_item/>
            </Menu>
          </Box>
          <Box

            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
             <div className='w-1/2 h-auto'> 
          <img src='https://firebasestorage.googleapis.com/v0/b/pesquisa-ec906.appspot.com/o/logo_nova.png?alt=media&token=f18fd556-3dca-4684-9c21-bf2595ebb5bb'></img>
          </div>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {localStorage.getItem('on') !== '0' && (
          <Menu_item/>
          )}
          </Box>
          {localStorage.getItem('on') !== '0' && (

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={arquivo?.toString()}sx={{ width: 50, height: 50 }} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

               <MenuItem key="" onClick={logout}>
                Sair
              
              {/* <Link to={'/user-inicio'} > 
                  <Typography textAlign="center">Inicio-USR</Typography>
                  </Link> */}
                </MenuItem>
              
            </Menu>
            
          </Box>
            )}
        </Toolbar>
      </Container>
    </AppBar>

</Box>
    </>

    );
}
      
