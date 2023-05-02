import React, { useEffect, useState } from "react";
import GridList from "../../components/GridList";
import NavBar from "../../components/NavBar";
import { getPokemonById, getPokemones } from "../../api/apis";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";

const Grilla = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);

  const [image, setImage] = useState({});
  const [types, setTypes] = useState([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("pagina") || "1", 10);

  useEffect(() => {
    getPokemones(page).then((res) => {
      setPokemonList(res.data.results.map((pokemon) => pokemon.name));
      console.log(res.data.count)
      setCount(/* (res.data.count % 12) +  */ 1 + parseInt(res.data.count / 12));
    });
  }, [page]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   for (let pokemon of pokemonList) {
  //     getPokemonById(pokemon)
  //       .then((res) => {
  //         setImage((prevImage) => ({
  //           ...prevImage,
  //           [pokemon]:
  //             res.data.sprites.other["official-artwork"].front_default,
  //         }));
  //         setTypes((prevType) => ({
  //           ...prevType,
  //           [pokemon]: res.data.types.map(
  //             (type) => type.type.name
  //           ) /* .join(', ') */,
  //         }));
  //       })
  //       .catch((error) => console.log(error))
  //       .finally(() => setIsLoading(false))
  //   }
  // }, [pokemonList]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all(
      pokemonList.map((pokemon) =>
        getPokemonById(pokemon).then((res) => ({
          name: pokemon,
          image: res.data.sprites.other["official-artwork"].front_default,
          types: res.data.types.map((type) => type.type.name),
        }))
      )
    )
      .then((results) => {
        const newImage = {};
        const newTypes = {};
        results.forEach((result) => {
          newImage[result.name] = result.image;
          newTypes[result.name] = result.types;
        });
        setImage(newImage);
        setTypes(newTypes);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [pokemonList]);

  return isLoading ? (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <Loading />
      </Grid>
    </Grid>
  ) : (
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
            pokemonList={pokemonList}
            image={image}
            types={types}
            page={page}
            count={count}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Grilla;
