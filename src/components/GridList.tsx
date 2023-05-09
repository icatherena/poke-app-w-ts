import * as React from "react";
import { createTheme } from "@mui/material";
import {
  CardMedia,
  CardContent,
  Card,
  Grid,
  Typography,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  /* pokemonList: Array<any>
  image: Array<any>
  types: Array<any>
  page: number
  count: number */
  pokemones: Array<Pokemon>
}

interface Pokemon {
    id: number
    name: Array<string>
    images: string | undefined 
    types: Array<any>
}

interface Type {
  pokemon_v2_type: any
}

const GridList = ({ /* pokemonList, image, types, page, count, */ pokemones }: Props) => {
  const theme = createTheme({});
  const pasarAMayus = (pokemon: any) => {
    return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  };
  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: "2em",
      }}
    >
      {pokemones.map((pokemon: Pokemon) => (
        <Grid item key={pokemon.id}>
          <Card
            sx={{
              maxWidth: 345,
              border: ".5px solid rgb(39, 114, 185)",
              borderRadius: "1em",
              /* m: "1em" */
              "&:hover": {
                boxShadow: 5,
              },
            }}
          >
            <CardMedia
              image={pokemon.images}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                /* mx: ".5em" */
                py: 0,
              }}
            >
              <Link
                to={`/descripcion/${pokemon.name}/`}
                style={{
                  textDecoration: "none",
                  color: "rgb(52, 105, 165)",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  justifyContent="flex-start"
                  px={1}
                  sx={{
                    "&:hover": {
                    /* textDecoration: "underline", */
                    cursor: "pointer",
                    color: "rgb(36,73,115)",
                    fontWeight: "500", 
                  }}}
                >
                  {pasarAMayus(pokemon)}
                </Typography>
              </Link>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: ".5em",
                }}
              >
                { pokemon.types.map((type: any)  => (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        border: ".5px solid rgb(39, 114, 185)",
                        borderRadius: "1em",
                        width: "fit-content",
                        px: "1em",
                        justifyContent: "flex-end",
                      }}
                    >
                      {type.pokemon_v2_type.name}
                    </Typography>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {/* <Pagination
        sx={{
          padding: ".7em",
          borderTop: "1px solid rgb(225, 225, 225)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
        page={page}
        count={count}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/grilla${item.page === 1 ? "" : `?pagina=${item.page}`}`}
            {...item}
          />
        )}
      /> */}
    </Grid>
  );
};

export default GridList;
