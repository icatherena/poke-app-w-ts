import React, { useEffect, useState } from "react";

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
import { createTheme } from "@mui/material";
import { isJSDocUnknownTag } from "typescript";

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

    const theme = createTheme();

    const { data: datos } = useQuery(GET_DATA);

    //useLazyQuery retorna un array, 
    //el primer elemento de este array se lo utiliza para llamar a la query,
    //el segundo elemento es un objeto
    const [getSearch, { data, loading, error }] = useLazyQuery(GET_POKEMON_BY_NAME);

    useEffect(() => {
        if (datos?.types && types.length === 0) {
            setTypes(datos.types.map((item: any) => item.name));
        }
    }, [datos?.types, types])

    useEffect(() => {
        if (datos?.color && color.length === 0) {
            setColor(`%`);
        }
    }, [datos?.color, color])

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
                    mx: "6em",
                    zIndex: "50",
                    width: "90%",
                    gap: "1.5em",
                    [theme.breakpoints.down("lg")]: {
                        mx: "2em",
                        gap: "1em",
                        justifyContent: "center",
                        alignItems: "center",                        
                    },
                }}
            >
                <Grid item>
                    <Paper
                        component="form"
                        sx={{
                            height: 40,
                            width: 200,
                            px: "10px",
                            display: 'flex',
                            alignItems: 'center',
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
                        />
                    </Paper>
                </Grid>
                {/* isBaby checkbox filter  */}
                <Grid item>
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
                {/* single color selection filter */}
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
                            value={color}
                            label="Color"
                            onChange={handleChangeColor}
                            sx={{
                                borderRadius: '1em',
                                outline: '0px',
                            }}
                        >
                            <MenuItem value={`%`}>
                                <em>Todos</em>
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
                            position: "relative",
                        }}
                    >
                        <InputLabel
                            shrink
                            sx={{
                                position: "absolute",
                                bottom: "1.56em",
                                left: "1em"
                            }}
                        >
                            Peso Mínimo
                        </InputLabel>
                        <InputBase
                            placeholder="Peso mínimo"
                            type="number"
                            value={minWeight}
                            onChange={(e: any) => setMinWeight(Number(e.target.value))}
                            inputProps={{
                                step: 10,
                                min: 0,
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
                            position: "relative",
                        }}
                    >
                        <InputLabel
                            shrink
                            sx={{
                                position: "absolute",
                                bottom: "1.56em",
                                left: "1em"
                            }}
                        >
                            Peso Máximo
                        </InputLabel>
                        <InputBase
                            placeholder="Peso máximo"
                            type="number"
                            value={maxWeight}
                            onChange={(e: any) => setMaxWeight(Number(e.target.value))}
                            inputProps={{
                                step: 10,
                                min: { minWeight },
                                onKeyDown: handleMaxWeight,
                                label: "Peso Máximo",
                            }}
                        />
                    </Paper>
                </Grid>
                {/* pokemon type multiple selection filter */}
                <Grid item>
                    <Paper
                        component="form"
                        sx={{
                            width: 180,
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
                                minWidth: 180,
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
                <Grid item
                    sx={{
                        height: 41,
                        border: "1px solid rgb(39, 114, 185)",
                        borderRadius: "1em",
                        boxShadow: 1,
                        "&:hover": {
                            boxShadow: 3,
                        }
                    }}
                >
                    <IconButton
                        type="button"
                        onClick={() => getSearch(
                            {
                                variables: {
                                    name: `%${name}%`, // lo traigo de useState
                                    isBaby,
                                    color,
                                    minWeight,
                                    maxWeight,
                                    types,
                                }
                            }
                        )}
                        /* onClick={handleApplyFilters} */
                        sx={{ p: '.36em' }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>

            {data && data.pokemones.length > 0 ? (
                <Grid container>
                    <Grid item
                        xs={12}
                        sx={{
                            mt: "2em",
                            mb: "2em",
                            [theme.breakpoints.up("xs")]: {
                                ml: "0.5em",
                                mt: "2em"
                            },
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