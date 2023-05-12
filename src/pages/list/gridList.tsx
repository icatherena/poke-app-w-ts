import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { useQuery, useLazyQuery, gql } from '@apollo/client';

import GridList from "../../components/GridList";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";
/* import SearchBar from "../../components/SearchBar"; */

import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import GridSearch from "../../components/GridSearch";



const GET_POKEMONLIST = gql`
  query GetPokemones($offset: Int!) {
    pokemones: pokemon_v2_pokemon(
      offset: $offset, 
      limit: 12
    ) {
      id
      name
      images: pokemon_v2_pokemonsprites {
        sprites
      }
      types: pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
    total_count: pokemon_v2_pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`;

/* interface Pokemon {
  name: string;
  id: number;
  images: string | undefined;
  types: any
  total_count: number
} */

const DisplayPokemones = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get("pagina") || "1", 10)
  const offset = (page - 1) * 12

  const { loading, error, data } = useQuery(GET_POKEMONLIST, {
    variables: {
      page,
      offset,
    }
  });

  const [name, setName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault(); // prevent the default form submission behavior
    window.location.href = `/busqueda/${name}/`;
  }

  if (loading) return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <Loading />
      </Grid>
    </Grid>
  );

  if (error) return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <NotFound />
      </Grid>
    </Grid>
  );

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
      <Grid container
        sx={{
          position: "relative",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            position: "absolute",
            top: "1em",
            right: "5em"
          }}
        >
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 235,
              border: '1px solid rgb(39, 114, 185)',
              borderRadius: '.5em',
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            <InputBase
              sx={{ px: 1, flex: 1 }}
              placeholder="Busquemos un pokemon!"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                /* e.preventDefault(); */
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <Link to={`/busqueda/${name}/`}>
              <IconButton
                type="button"
                /* onClick={() => getSearchedName()} */
                sx={{ p: '6px' }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          sx={{
            mt: "7em",
            mb: "2em",
          }}
        >
          <GridList
            pokemones={data.pokemones}
            total_count={Math.ceil(data.total_count.aggregate.count / 12)}
            page={page}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DisplayPokemones;