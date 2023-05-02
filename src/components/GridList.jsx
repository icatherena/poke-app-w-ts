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

const GridList = ({ pokemonList, image, types, page, count }) => {
  const theme = createTheme({});
  const pasarAMayus = (pokemon) => {
    return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
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
      {pokemonList.map((pokemon, index) => (
        <Grid item key={index}>
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
              component="img"
              alt={pokemon}
              height="fit-content"
              image={image[pokemon]}
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
                to={`/descripcion/${pokemon}/`}
                style={{
                  textDecoration: "none",
                  color: "rgb(52, 105, 165)",
                  "&:hover": {
                    /* textDecoration: "underline", */
                    cursor: "pointer",
                    color: "rgb(36, 73, 115)", /* No funciona al hacer hover */
                    fontWeight: "700", /* bold */
                  },
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  justifyContent="flex-start"
                  px={1}
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
                {types[pokemon] &&
                  types[pokemon].map((type) => (
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
                      {type}
                    </Typography>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Pagination
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
      />
    </Grid>
  );
};

export default GridList;
