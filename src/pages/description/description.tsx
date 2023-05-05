import React, { useEffect, useState } from "react";
import ImgMediaCard from "../../components/ImgMediaCard";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";
import { useParams } from "react-router-dom";
import FloatingButton from "../../components/FloatingButton";
import {
  getPokemonByName,
  getChainIdById,
  getEvolutionChainById,
} from "../../api/apis";
import { Grid } from "@mui/material";
import Loading from "../../components/Loading";

interface Evoluciones {
  species: {
    name: string
  }
  evolves_to: any
}

const Description = () => {
  const {name} = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [pokemon, setPokemon] = useState<string>();
  const [pokeId, setPokeId] = useState<number | undefined>();
  const [pokeImage, setPokeImage] = useState<string>();
  const [baseExp, setBaseExp] = useState<number>();
  const [pokeAbilities, setPokeAbilities] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [pokeMoves, setPokeMoves] = useState([]);

  const [PokeSpeciesUrl, setPokeSpeciesUrl] = useState();

  const [evolutionChainUrl, setEvolutionChainUrl] = useState([]);
  const [initialForm, setInitialForm] = useState<Array<Evoluciones>>();
  const [midForm, setMidForm] = useState<Array<Evoluciones>>([]);
  const [finalForm, setFinalForm] = useState<Array<Evoluciones>>([]);

  useEffect(() => {
    setIsLoading(true);
    
    getPokemonByName(name)
      .then((res) => {
        setPokemon(res.data.name);
        setPokeId(res.data.id);
        setBaseExp(res.data.base_experience);
        setPokeImage(res.data.sprites.other['official-artwork'].front_default);
        setPokeAbilities(res.data.abilities);
        setPokeTypes(res.data.types);
        setPokeMoves(res.data.moves);

        setPokeSpeciesUrl(res.data.species.url); 
        /* console.log(res.data.species.url); */
        let speciesId = res.data.species.url.split("/")[6];
        /* console.log(speciesId) */

        getChainIdById(parseInt(speciesId))
          .then((res) => {
            setEvolutionChainUrl(res.data.evolution_chain.url);
            /* console.log(res.data.evolution_chain.url); */
            let chainId = res.data.evolution_chain.url.split("/")[6];
            /* console.log(chainId); */

            getEvolutionChainById(parseInt(chainId))
              .then((res) => {
                setInitialForm(res.data.chain.species.name);
                setMidForm(
                  res.data.chain.evolves_to?.map((item: Evoluciones) => item.species.name)
                );
                setFinalForm(
                  res.data.chain.evolves_to?.map((item: Evoluciones) =>
                    item.evolves_to?.map((item: Evoluciones) => item.species.name)
                  )
                );
              });
          })

      })

      .catch((error) => {
        console.error(error);
        setPokemon(undefined);
      })

      .finally(() => setIsLoading(false));
      
  }, [name]);

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
            /* pokemon={pokemon} */
            name={pokemon}
            numPokedex={pokeId}
            bexp={baseExp}
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
              pokeId = {pokeId}
              type = "prev"
              disabled = {pokeId == undefined}
            />
          </Grid>
          <Grid item>
            <FloatingButton 
              pokemon = {pokemon} 
              pokeId = {pokeId}
              /* name={pokemon}  */
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