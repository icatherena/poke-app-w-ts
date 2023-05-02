import React, { useState, useEffect } from "react";
import BasicTable from "../../components/BasicTable";
import NavBar from "../../components/NavBar";
import { getPokemons } from "../../api/apis";
import { Grid, createTheme } from "@mui/material";
import bulbasaurUrl from "../../assets/bulbasaurUrl";
import { useLocation } from "react-router-dom";

const List = () => {
  const [pokemon, setPokemon] = useState([]);
  const [count, setCount] = useState(0);

  const theme = createTheme({});

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("pagina") || "1", 10);

  useEffect(() => {
    getPokemons(page).then((pokemon) => {
      setPokemon(pokemon.data.results);
      setCount((pokemon.data.count % 20) + parseInt(pokemon.data.count / 20));
    });
  }, [page]);
  console.log(count)

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            position: "fixed",
            width: "100%",
          }}
        >
          <NavBar />
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          sx={{
            position: "fixed",
            top: "5em",
            right: "2em",
            [theme.breakpoints.down("lg")]: {
              display: "none",
            },
            /* [theme.breakpoints.between("md", "lg")]: {
                            width: '50%',
                        }, */
          }}
        >
          <img src={bulbasaurUrl} alt="bulbasaur" />
        </Grid>
      </Grid>
      <Grid
        container
        /* spacing = { 1 }  */
        justifyContent="left"
        mx={4}
        mt={8}
        /* sx = {{
                    backgroundColor: "rgb(238, 249, 238)",
                }} */
      >
        <Grid item>
          <BasicTable pokemon={pokemon} page={page} count={count} />
        </Grid>
      </Grid>
    </>
  );
};

export default List;
