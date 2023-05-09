import React, { useEffect, useState } from "react";

import { getPokemonByName, getPokemones } from "../../api/apis";

import { useLocation } from "react-router-dom";

import GridList from "../../components/GridList";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";

import { Grid } from "@mui/material";

import { useQuery, gql } from '@apollo/client';

const GET_POKEMONLIST = gql`
  query GetPokemones {
    pokemones: pokemon_v2_pokemon {
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
  }
`;

interface Pokemon {
  name: string;
  id: number;
  images: string | undefined;
  types: any
}

const DisplayPokemones = () => {
  const { loading, error, data } = useQuery(GET_POKEMONLIST);
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
          />
        {/* {data.pokemones.map((pokemon: Pokemon) => (
        <div key={pokemon.id}>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.image} />
          <br />
          <h3>{pokemon.types.map((type: any) => type.pokemon_v2_type.name).join("/")}</h3>
        </div>
        ))
        } */}
        </Grid>
      </Grid>
    </>
  );
}

export default DisplayPokemones;



