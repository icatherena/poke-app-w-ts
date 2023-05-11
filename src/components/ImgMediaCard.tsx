import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  Typography,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
/* import { useTheme } from "@emotion/react"; */

const ImgMediaCard = ({ abilities, height, moves, name, numPokedex, types, weight, evolution }: any) => {
  const [pokemon, setPokemon] = useState<string>();

  useEffect(() => {
    setPokemon(name);
  }, [name]);

  const pasarAMayus = (name: any) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const theme = createTheme({});

  return (
    <Grid
      container
      sx={{
        padding: "2em",
        /* backgroundColor: "rgb(238, 249, 238)" */
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          /* backgroundColor: "rgba(255, 0, 255)", */
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={9}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        > 
          <Card
            sx={{
              backgroundColor: "rgb(238, 249, 238)",
              border: "1px solid rgb(39,114,185)",
              borderRadius: "1em",
              boxShadow: 3,
              display: "flex",
              alignItems: "center",
              /* gap: "1em", */
              
                [theme.breakpoints.down("md")]: {
                  width: "70%",
                  flexDirection: "column",
                }
              
            }}
          >
            <CardMedia
              component="img"
              alt={name}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numPokedex}.png`}
              sx={{
                /* backgroundColor: "rgb(238, 249, 238)", */
                height: "fit-content",
                margin: "1em 2em",
                minWidth: "40%",
                overflow: "hidden",
                /* border: "1px solid rgb(39,114,185)", */
              }}
            />
            <CardContent
              sx={{
                backgroundColor: "rgb(255, 255, 255)",
                borderLeft: "1px solid rgb(39,114,185)",
                borderRadius: "1em",
                minWidth: "40%",
                padding: "2em 3em",
                textAlign: "center",
                [theme.breakpoints.down("md")]: {
                  borderLeft: "none",
                  borderTop: "1px solid rgb(39,114,185)",
                }
              }}
            >
              <Typography gutterBottom variant="h4" component="div">
                <b>{pasarAMayus(name)}</b>
              </Typography>

              <Divider>
                <b>POSICIÓN EN LA POKEDEX</b>
              </Divider>
              <Typography variant="body1">#{numPokedex}</Typography>
              <br />

              <Divider >
                <b>POKEMÓN TIPO</b>
              </Divider>
              <Typography variant="body1">
                {types.map((type: any) => type.type.name).join(" - ")}
              </Typography>
              <br />

              <Divider>
                <b>CADENA EVOLUTIVA</b>
              </Divider>
              <Grid container justifyContent={"center"}>
                {evolution.map((item: any) => (
                    <Grid item xs={12}>
                      <Link
                        to={`/descripcion/${item}/`} 
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          textDecoration: "none",
                          color: "rgb(52, 105, 165)",
                        }}
                      >
                        {item}
                        <OpenInNewIcon
                          fontSize="small"
                          sx={{
                            color: "rgb(52, 105, 165)",
                            "&:hover": {
                              color: "rgb(36,73,115)",
                              weight: "bold",
                            },
                          }}
                        />
                      </Link>
                    </Grid>
                  ))
                }
              </Grid>
              <br />

              <Divider>
                <b>HABILIDADES</b>
              </Divider>
              <Typography variant="body1">
                {abilities
                  .map((ability: any) => ability.ability.name)
                  .join(" - ")}
              </Typography>
              <br />

              <Divider>
                <b>MOVIMIENTOS</b>
              </Divider>
              <Typography variant="body1">
                {moves
                  .slice(0, 5)
                  .map((move: any) => move.move.name)
                  .join(", ")}
              </Typography>
              <br />

              <Divider><b>ALTURA</b></Divider>
              <Typography variant="body1">
                  {weight} dm
              </Typography><br/>
                
              <Divider><b>PESO</b></Divider>
              <Typography variant="body1">
                  {height} hg
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImgMediaCard;
