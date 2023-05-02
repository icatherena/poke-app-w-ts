import React, { useEffect, useState } from "react";
import ImgMediaCard from "../../components/ImgMediaCard";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";
import { useParams } from "react-router-dom";
import FloatingButton from "../../components/FloatingButton";
import {
  getPokemonById,
  getChainIdById,
  getEvolutionChainById,
} from "../../api/apis";
import { Grid } from "@mui/material";
import Loading from "../../components/Loading";

const Description = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [pokemon, setPokemon] = useState();
  const [pokeName, setPokeName] = useState("");
  const [pokeImage, setPokeImage] = useState("");
  const [pokeAbilities, setPokeAbilities] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokeMoves, setPokeMoves] = useState([]);

  const [PokeSpeciesUrl, setPokeSpeciesUrl] = useState();

  const [evolutionChainUrl, setEvolutionChainUrl] = useState([]);
  const [initialForm, setInitialForm] = useState();
  const [midForm, setMidForm] = useState([]);
  const [finalForm, setFinalForm] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    
    getPokemonById(id)
      .then((res) => {
        setPokemon(res.data);
        setPokeName(res.data.name);
        setPokeImage(res.data.sprites.other['official-artwork'].front_default);
        console.log(res.data.sprites.other['official-artwork'].front_default);
        setPokeAbilities(res.data.abilities);
        setPokeTypes(res.data.types);
        setPokeMoves(res.data.moves);

        setPokeSpeciesUrl(res.data.species.url); 
        console.log(res.data.species.url);
        let speciesId = res.data.species.url.split("/")[6];
        console.log(speciesId)

        getChainIdById(parseInt(speciesId))
          .then((res) => {
            setEvolutionChainUrl(res.data.evolution_chain.url);
            console.log(res.data.evolution_chain.url);
            let chainId = res.data.evolution_chain.url.split("/")[6];
            console.log(chainId);

            getEvolutionChainById(parseInt(chainId))
              .then((res) => {
                setInitialForm(res.data.chain.species.name);
                /* console.log(res.data.chain.species.name) */
                setMidForm(
                  res.data.chain.evolves_to?.map((item) => item.species.name)
                );
                /* console.log(res.data.chain.evolves_to?.map((item) => item.species.name)) */
                setFinalForm(
                  res.data.chain.evolves_to?.map((item) =>
                    item.evolves_to?.map((item) => item.species.name)
                  )
                );
                /* console.log(res.data.chain.evolves_to?.map((item) => item.evolves_to?.map((item) => item.species.name))) */
              });
          })

          /* .catch((error) => {
            console.error(null);
            setEvolutionChainUrl(null);
          }) */
      })

      .catch((error) => {
        console.error(error);
        setPokemon(undefined);
      })

      .finally(() => setIsLoading(false));
      
  }, [id]);

  return (
    isLoading ? (
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Loading />
        </Grid>
      </Grid>
    ) : (pokemon ? (
      <Grid container>
        <Grid item xs={12}
          sx = {{
            position: 'fixed',
            width: '100%',
          }}
        >
          <NavBar />
        </Grid>
        <Grid item
          position='fixed'
          m={2}          
        >
              <FloatingButton type="list"/>
          </Grid>
        <Grid item xs={12}
          mt = { 9 }
        >
          <ImgMediaCard
            pokemon={pokemon}
            name={pokeName}
            numPokedex={pokemon.id}
            bexp={pokemon.base_experience}
            initialForm={initialForm}
            midForm={midForm}
            finalForm={finalForm}
            image={pokeImage}
            abilities={pokeAbilities}
            moves={pokeMoves}
            types={pokeTypes}
            /* weight={pokemon.weight}
            height={pokemon.height} */
          />
        </Grid>
        <Grid container
        px={
          2
        }
          sx = {{
              position: 'fixed',
              top: '50%',
              justifyContent: 'space-between',

          }}
        >
          <Grid item>
            <FloatingButton 
              pokemon = {pokemon} 
              type = "prev"
              disabled = {pokemon.id <= 0}
            />
          </Grid>
          <Grid item>
            <FloatingButton 
              pokemon={pokemon} 
              name={pokeName} 
              type="next"/>
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <NotFound />
        </Grid>
      </Grid>
    ))
  )
    
};

export default Description;