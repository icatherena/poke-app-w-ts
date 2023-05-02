import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import logoUrl from '../assets/logoUrl';

const NavBar = () => {
    return (
        <Grid container>
            <Grid item xs={12} sx={{
                    padding: '1em',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'rgb(255, 255, 255)',
                    borderBottom: '1px solid rgb(39,114,185)'
                }}>
                <nav >
                    <Link to={`/`}>
                        <img src={logoUrl} alt='pokeLogo' height='40px' /> 
                    </Link>
                </nav>
            </Grid>
        </Grid>
    );
}

export default NavBar;