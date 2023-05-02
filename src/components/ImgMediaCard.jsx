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

const ImgMediaCard = (props) => {
  const [pokemon, setPokemon] = useState();
  const [listaEvoluciones, setListaEvoluciones] = useState([]);
  const [mensaje, setMensaje] = useState();

  useEffect(() => {
    setPokemon(props.pokemon);
  }, [props.pokemon]);

  useEffect(() => {
    evaluarEvoluciones(props);
  }, [props]);

  const evaluarEvoluciones = (props) => {
    // Para los casos que la cadena evolutiva es nula o indefinida
    // se setea su valor unicamente cuando es distinto de nulo o indefinido
    if (props.initialForm && props.initialForm.length > 0) {
      if (props.initialForm !== null || props.initialForm !== undefined) {
        setListaEvoluciones([props.initialForm]);
      }
      // En un inicio, mensaje al no estar definido setea la cadena que se le asignaría en el ese
      // Para salvar esa situación, se setea el valor de mensaje en null
      setMensaje(null);
    } else {
        setMensaje("No posee cadena evolutiva");
    }
    // A continuación se evalúa si existe y si contiene un elemento
    if (props.midForm && props.midForm.length > 0) {
      // Para concatenar los elementos que traería midForm si fuera un array
      // y no un único elemento,
      // se crea un segundo array
      let midList = [];
      // Se evalúa si midForm es o no un array de elementos
      if (Array.isArray(props.midForm)) {
        // Si cumple la condición, se mapea midForm y se asigna al array midList
        midList = props.midForm.map((item) => item);
        // A continuación, para añadir los elementos del array midList,
        // se usa concat para traer una copia de los elementos que ya están
        // seteados en listaEvoluciones y se añaden los que trae midList
        setListaEvoluciones((prevList) => prevList.concat(midList));
      } else {
        // Si midForm no cumple con la condición (no es un array),
        // se setea midForm de la misma forma que se hizo con midList usando concat
        setListaEvoluciones((prevList) => prevList.concat(props.midForm));
      }
    }
    // Como no se tiene certeza de que el pokemon inicial tenga o no
    // una segunda evolución, se evalua nuevamente si contiene al menos un elemento
    if (props.finalForm && props.finalForm.length > 0) {
      // Se evalúa si finalForm tiene algún valor distinto de indefinido o nulo
      // Si no se evaluara en este momento, se añadiría más adelante
      // un array de elementos nulos/indefinidos que se mostrarían al mapear
      // listaEvoluciones dentro del return
      if (props.finalForm !== null && props.finalForm !== undefined) {
        // Si cumple condición, se evalúa a continuación si se trata de un array
        if (Array.isArray(props.finalForm)) {
          // Debido a que finalForm a diferencia de initial y midForm trae los elementos como
          // un array, para concatenarlos y evitar que se añadan a listaEvoluciones como otro array
          // se recorre el array mediante el uso de for, y sólo si el elemento no es nulo, se añade
          // a listaEvoluciones
          for (let i = 0; i < props.finalForm.length; i++) {
            if (props.finalForm[i] !== null) {
              setListaEvoluciones((prevList) =>
                prevList.concat(props.finalForm[i])
              );
            }
          }
        } else {
          // Si no cumple la condición (no es un array, simplemente se añade el elemento a listaEvoluciones)
          setListaEvoluciones((prevList) => prevList.concat(props.finalForm));
        }
      }
    }
  };

  useEffect(() => {}, [listaEvoluciones]);

  const pasarAMayus = (props) => {
    return props.name.charAt(0).toUpperCase() + props.name.slice(1);
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
              alt={props.name}
              image={props.image}
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
                <b>{pasarAMayus(props)}</b>
              </Typography>

              <Divider variant="body1">
                <b>POSICIÓN EN LA POKEDEX</b>
              </Divider>
              <Typography variant="body1">#{props.numPokedex}</Typography>
              <br />

              <Divider variant="body1">
                <b>ESPERIENCIA BASE</b>
              </Divider>
              <Typography variant="body1">{props.bexp} xp</Typography>
              <br />

              <Divider variant="body1">
                <b>POKEMÓN TIPO</b>
              </Divider>
              <Typography variant="body1">
                {props.types.map((type) => type.type.name).join(" - ")}
              </Typography>
              <br />

              <Divider variant="body1">
                <b>CADENA EVOLUTIVA</b>
              </Divider>
              <Grid container justifyContent={"center"}>
                {mensaje ? (
                  <Grid item>
                    <Typography>{mensaje}</Typography>
                  </Grid>
                ) : (
                  listaEvoluciones.map((item, index) => (
                    <Grid item xs={12} key={index}>
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
                          "&:hover": {
                            color: "rgb(36,73,115)",
                            weight: "bold",
                          },
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
                )}
              </Grid>
              <br />

              <Divider variant="body1">
                <b>HABILIDADES</b>
              </Divider>
              <Typography variant="body1">
                {props.abilities
                  .map((ability) => ability.ability.name)
                  .join(" - ")}
              </Typography>
              <br />

              <Divider variant="body1">
                <b>MOVIMIENTOS</b>
              </Divider>
              <Typography variant="body1">
                {props.moves
                  .slice(0, 5)
                  .map((move) => move.move.name)
                  .join(", ")}
              </Typography>
              <br />

              {/* <Divider variant="body1"><b>ALTURA</b></Divider>
              <Typography variant="body1">
                  {props.weight} cm
              </Typography><br/>
                
              <Divider variant="body1"><b>PESO</b></Divider>
              <Typography variant="body1">
                  {props.height} kg
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImgMediaCard;
