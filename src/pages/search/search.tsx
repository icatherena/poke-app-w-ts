import React, { useState } from "react";

import { gql, useLazyQuery, useQuery } from "@apollo/client";

import GridSearch from "../../components/GridSearch";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";

import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from "react-router-dom";

const GET_POKEMONLIST = gql`
  query GetPokemones($searchedName: String!) {
    pokemones: pokemon_v2_pokemon(
        where: {
            name: {
                _ilike: $searchedName
            }
        }
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

const GET_POKEMON_BY_NAME = gql`
query GetPokemonByName($name: String!) {
    pokemones: pokemon_v2_pokemon (
        where: {
            name: {
                _eq: $name
            }
        }
    ) {
        name
        id
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

const Search = () => {
    const { searchedName } = useParams<{ searchedName: string }>();

    const { loading, error, data } = useQuery(GET_POKEMONLIST, {
        variables: {
          searchedName
        }
    });

    const [name, setName] = useState("");

    //useLazyQuery retorna un array, 
    //el primer elemento de este array se lo utiliza para llamar a la query,
    //el segundo elemento es un objeto
    const [getSearchedName, { data: busqueda/* , error: errorBusqueda, loading: loadingBusqueda, called  */}] = useLazyQuery(GET_POKEMON_BY_NAME, {
        variables: {
            name // lo traigo de useState
        }
    });

    /* console.log({
        busqueda,
        errorBusqueda,
        loadingBusqueda,
        called
    }); */

    console.log({
        data,
        loading,
        error
    })

    if (error) return (
        <Grid container>
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12}>
                <NotFound />
            </Grid>
        </Grid>
    )

    if (loading) return (
            <Grid container>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12}>
                    <Loading />
                </Grid>
            </Grid>
    )

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
                sx = {{
                    position: "relative",
                }}    
            >
                <Grid item
                    sx = {{
                        position: "absolute",
                        top: "1em",
                        right: "5em",
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
                        />
                        <IconButton
                            type="button"
                            onClick={() => getSearchedName()}
                            sx={{ p: '6px' }}
                            aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {busqueda && busqueda.pokemones.length > 0 ? (
            <Grid container>
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item
                    sx = {{
                        mt: "2em",
                        mb: "0em",
                    }}
                >
                    <GridSearch pokemones={busqueda.pokemones} />
                </Grid>
            </Grid>
            ) : (
                <Grid container>
                    <Grid item xs={12}>
                        <NavBar />
                    </Grid>
                    <Grid item
                        sx = {{
                            mt: "2em",
                            mb: "0em",
                        }}
                    >
                        <GridSearch pokemones={data.pokemones}/>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Search;