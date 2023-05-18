import React, { useState } from "react";

import { gql, useLazyQuery, useQuery } from "@apollo/client";

import GridSearch from "../../components/GridSearch";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";

/* import Select, { MultiValue } from "react-select"; */

import { Checkbox, Grid, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput } from "@mui/material";

const GET_DATA = gql`
  query GetData {
    color: pokemon_v2_pokemoncolor {
        name
    }
    types: pokemon_v2_type {
        name
    }
  }
`;

const GET_POKEMON_BY_NAME = gql`
query GetPokemonByName($name: String, $isBaby: Boolean, $color: String, $minWeight: Int, $maxWeight: Int, $types: [String]) {
    pokemones: pokemon_v2_pokemon (
        where: {
            name: {
                _ilike: $name
            },
            pokemon_v2_pokemonspecy: {
                is_baby: {
                    _eq: $isBaby
                },
                pokemon_v2_pokemoncolor: {
                    name: {
                        _ilike: $color
                    }
                },
            },
            weight: {
                _gte: $minWeight,
                _lte: $maxWeight,
            },
            pokemon_v2_pokemontypes: {
                pokemon_v2_type: {
                    name: {
                        _in: $types
                    }
                }
            },
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
    const searchedName = localStorage.getItem('searchedName');

    const [name, setName] = useState(searchedName);
    const [isBaby, setIsBaby] = useState<boolean>(false);
    const [color, setColor] = useState<string>("");
    const [minWeight, setMinWeight] = useState<number>(0);
    const [maxWeight, setMaxWeight] = useState<number>(100);
    const [types, setTypes] = useState<string[]>([]);

    const { data: datos } = useQuery(GET_DATA);

    //useLazyQuery retorna un array, 
    //el primer elemento de este array se lo utiliza para llamar a la query,
    //el segundo elemento es un objeto
    const [getSearchedName, { data, loading, error }] = useLazyQuery(GET_POKEMON_BY_NAME, {
        variables: {
            name: `%${name}%`, // lo traigo de useState
            isBaby,
            color,
            minWeight,
            maxWeight,
            types,
        }
    });

    const handleChangeColor = (e: SelectChangeEvent) => {
        setColor(e.target.value);
    };

    const handleMinWeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            setMinWeight(prev => prev + 10);
        } else if (e.key === 'ArrowDown') {
            if (minWeight >= 10) {
                setMinWeight(prev => prev - 10);
            } else {
                setMinWeight(0);
            }
        }
    };

    const handleMaxWeight = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            setMaxWeight(prev => prev + 10);
        } else if (e.key === 'ArrowDown') {
            if (maxWeight > minWeight) {
                setMaxWeight(prev => prev - 10);
            } else {
                setMaxWeight(minWeight);
            }
        }
    };

    const handleChangeTypes = (e: SelectChangeEvent<typeof types>) => {
        const {
            target: { value },
        } = e;
        setTypes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    console.log(data);

    /* const handleTypes = (e: SelectChangeEvent) => {
        setTypes(e.target.value);
    }; */

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
                    sx={{
                        position: "fixed",
                        zIndex: "100",
                        width: "100%",
                        backgroundColor: "rgb(255,255,255)",
                    }}
                    xs={12}
                >
                    <NavBar />
                </Grid>
            </Grid>
            <Grid container
                sx={{
                    mt: "7em",
                    mx: "5em",
                    zIndex: "50",
                }}
            >
                <Grid item>
                    <Paper
                        component="form"
                        sx={{

                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 235,
                            border: '1px solid rgb(39, 114, 185)',
                            borderRadius: '1em',
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <InputBase
                            sx={{
                                px: 1,
                                flex: 1,
                            }}
                            placeholder="Busquemos un pokemon!"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={(e) => {
                                /* e.preventDefault(); */
                                if (e.key === "Enter") {
                                    getSearchedName();
                                }
                            }}
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
                {/* isBaby checkbox filter  */}
                <Grid item
                    sx={{
                        mx: "1.5em",
                    }}
                >
                    <Paper
                        component="form"
                        sx={{
                            height: "40px",
                            px: '4px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 130,
                            border: '1px solid rgb(39, 114, 185)',
                            borderRadius: '1em',
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <Checkbox
                            aria-label="¿Es bebé?"
                            checked={isBaby}
                            onChange={(e) => setIsBaby(e.target.checked)}
                        />
                        <InputBase
                            sx={{
                                flex: 1,
                            }}
                            disabled
                            placeholder="¿Es bebé?"
                            type="text"
                        />
                    </Paper>
                </Grid>
                {/* color simple selection filter */}
                <Grid item>
                    <FormControl
                        sx={{
                            mt: .2,
                            minWidth: 120,
                            border: '1px solid rgb(39, 114, 185)',
                            borderRadius: '1em',
                            boxShadow: 1,
                            "&:hover": {
                                boxShadow: 1,
                                border: '0px solid rgb(39, 114, 185)',
                            },
                            "&selected": {
                                boxShadow: 1,
                                border: '0px solid rgb(39, 114, 185)',
                            },
                        }}
                        size="small"
                    >
                        <InputLabel
                            id="demo-select-small-label"
                        >
                            Color
                        </InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            disableUnderline={true}
                            id="demo-select-small"
                            value={color}
                            label="Color"
                            onChange={handleChangeColor}
                            sx={{
                                borderRadius: '1em',
                                outline: '0px',
                            }}
                        >
                            <MenuItem value={color}>
                                <em>Ninguno</em>
                            </MenuItem>
                            {datos?.color?.map((item: any) => (
                                <MenuItem value={item.name}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* pokemon weight range filter */}
                <Grid item
                    sx={{
                        mx: "1.5em",
                        display: "flex",
                        flexDirection: "row",
                        gap: "1.5em",
                    }}
                >
                    <Paper
                        component="form"
                        sx={{
                            height: "40px",
                            px: '10px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 100,
                            border: '1px solid rgb(39, 114, 185)',
                            borderRadius: '1em',
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <InputBase
                            /* label="Peso Mínimo" */
                            placeholder="Peso mínimo"
                            type="number"
                            value={minWeight}
                            onChange={(e: any) => setMinWeight(Number(e.target.value))}
                            inputProps={{
                                step: 10,
                                min: 0,
                                disableUnderline: true,
                                onKeyDown: handleMinWeight,
                            }}
                        />
                    </Paper>
                    <Paper
                        component="form"
                        sx={{
                            height: "40px",
                            px: "10px",
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 100,
                            border: '1px solid rgb(39, 114, 185)',
                            borderRadius: '1em',
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <InputBase
                            placeholder="Peso máximo"
                            type="number"
                            value={maxWeight}
                            onChange={(e: any) => setMaxWeight(Number(e.target.value))}
                            inputProps={{
                                step:10,
                                min: {minWeight},
                                onKeyDown: handleMaxWeight,
                                label: "Peso Máximo",
                            }}
                        />
                        {/* <InputBase
                            sx={{
                                flex: 1,
                            }}
                            disabled
                            placeholder="Peso Máximo"
                            type="text"
                        /> */}
                    </Paper>
                </Grid>
                {/* pokemon type multiple selection filter */}
                <Grid item>
                    <Paper
                        component="form"
                        sx={{
                            width: 170,
                            height: 40,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid rgb(39, 114, 185)',
                            borderRadius: '1em',
                            "&:hover": {
                                boxShadow: 3,
                            },
                        }}
                    >
                        <FormControl
                            sx={{
                                minWidth: 170,
                                border: '1px solid rgb(39, 114, 185)',
                                borderRadius: '1em',
                                boxShadow: 1,
                                "&:hover": {
                                    boxShadow: 1,
                                    border: '0px solid rgb(39, 114, 185)',
                                },
                                "&selected": {
                                    boxShadow: 1,
                                    border: '0px solid rgb(39, 114, 185)',
                                },
                            }}
                            size="small"
                        >
                            <InputLabel>
                                Tipos
                            </InputLabel>
                            <Select
                                multiple
                                value={types}
                                label="Tipo"
                                onChange={handleChangeTypes}
                                sx={{
                                    borderRadius: '1em',
                                    outline: '0px',
                                }}
                                input={
                                    <OutlinedInput label="Tipo" />
                                }
                            >
                                {/* <MenuItem value={types}>
                                    <em>Ninguno</em>
                                </MenuItem> */}
                                {datos?.types?.map((item: any) => (
                                    <MenuItem
                                        key={item.name}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>

            {data && data.pokemones.length > 0 ? (
                <Grid container
                    sx={{
                        // ml: '5em',
                        // backgroundColor: 'red'
                    }}>
                    <Grid item
                        sx={{
                            mt: "2em",
                            mb: "2em",

                        }}
                    >
                        <GridSearch pokemones={data.pokemones} />
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    <Grid item
                        sx={{
                            mt: "2em",
                            mb: "2em",
                            mx: "5em",
                        }}
                    >
                        <Typography>
                            ¡Busquemos un pokemón!
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Search;