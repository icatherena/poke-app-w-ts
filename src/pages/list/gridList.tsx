import React from "react";

import { useLocation } from "react-router-dom";

import { useQuery, gql } from '@apollo/client';

import GridList from "../../components/GridList";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";

import { Grid } from "@mui/material";

const GET_POKEMONLIST = gql`
  query GetPokemones($offset: Int!) {
    pokemones: pokemon_v2_pokemon(offset: $offset, limit: 12) {
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
      evolutions: pokemon_v2_pokemonevolution {
        pokemon_species: pokemon_v2_pokemonspecy {
          evolution_chain: pokemon_v2_evolutionchain {
            id
            pokemon_v2_pokemonspecies {
              name
            }
          }
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
  const offset = (page-1)*12

  const { loading, error, data } = useQuery(GET_POKEMONLIST, {
    variables: {page, offset}
  });
  console.log(data);

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

  return  (
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
            mt: "7em",
            mb: "2em",
          }}
        >
          <GridList
            pokemones = {data.pokemones}
            total_count={Math.ceil(/* data.total_count.aggregate.count%12 + */ data.total_count.aggregate.count/12)}
            page={page}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DisplayPokemones;



