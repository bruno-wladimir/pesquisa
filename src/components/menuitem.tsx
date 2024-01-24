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
<MenuItem key="/sobre" onClick={handleCloseNavMenu}>
              <Link to={'/sobre'} > 
                  <Typography textAlign="center">sobre</Typography>
                  </Link>
                </MenuItem>

                <MenuItem key="/index" onClick={handleCloseNavMenu}>
              <Link to={'/'} > 
                  <Typography textAlign="center">Index</Typography>
                  </Link>
                </MenuItem>

                <MenuItem key="/dash" onClick={handleCloseNavMenu}>
              <Link to={'/dash'} > 
                  <Typography textAlign="center">Dash</Typography>
                  </Link>
                </MenuItem>


                <MenuItem key="/pesquisa" onClick={handleCloseNavMenu}>
              <Link to={'/pesquisa'} > 
                  <Typography textAlign="center">Pesquisa</Typography>
                  </Link>
                </MenuItem>


                <MenuItem key="/index_lojista" onClick={handleCloseNavMenu}>
                <Link to={'/index_lojista'} > 
                  <Typography textAlign="center">Acesso Lojista</Typography>
                  </Link>
                </MenuItem>


                </>
    )
}