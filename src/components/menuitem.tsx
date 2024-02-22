import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Link } from 'react-router-dom';

export default function menuitem() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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


    return(
<>
  


                {/* <MenuItem key="/user-inicio" onClick={handleCloseNavMenu}>
              <Link to={'/user-inicio'} > 
                  <Typography textAlign="center">Inicio-USR</Typography>
                  </Link>
                </MenuItem> */}


                {/* <MenuItem key="/user-pesquisa" onClick={handleCloseNavMenu}>
              <Link to={'/user-pesquisa'} > 
                  <Typography textAlign="center">Pesquisa-USR</Typography>
                  </Link>
                </MenuItem> */}

{/* LOGISTA */}

                <MenuItem key="/lojista-enviopesquisa" onClick={handleCloseNavMenu}>
                <Link to={'/lojista-enviopesquisa'} > 
                  <Typography textAlign="center" color="#000000">Envio Pesquisa</Typography>
                  </Link>
                </MenuItem>

            
                <MenuItem key="/lojista-dash" onClick={handleCloseNavMenu}>
                <Link to={'/lojista-dash'} > 
                  <Typography textAlign="center" color="#000000">Relatório</Typography>
                  </Link>
                </MenuItem>
                <MenuItem key="/lojista-configuracao" onClick={handleCloseNavMenu}>
                <Link to={'/lojista-configuracao'} > 
                  <Typography textAlign="center" color="#000000">Configurações</Typography>
                  </Link>
                </MenuItem>
                
                </>
    )
}