import React, { useState, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
/* import Description from './pages/description/description'; */
import Grilla from './pages/list/gridList';
import List from './pages/list/list';
import { ThemeProvider } from '@mui/material';
import { useTheme } from '@emotion/react';
import DisplayPokemon from './pages/description/description';

function App() {
const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lista' element={<List />} />
        <Route path='/grilla' element={<Grilla />}  />
        {/* <Route path='/descripcion/:name' element={<Description />} /> */}
        <Route path='/descripcion/:name' element={<DisplayPokemon />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;