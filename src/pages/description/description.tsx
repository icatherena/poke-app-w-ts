import React from "react";

import { useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";

import FloatingButton from "../../components/FloatingButton";
import ImgMediaCard from "../../components/ImgMediaCard";
import Loading from "../../components/Loading";
import NavBar from "../../components/NavBar";
import NotFound from "../../components/NotFound";

import { Grid } from "@mui/material";

const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon: pokemon_v2_pokemon(where: { name: { _eq: $name } }) {
      id
      name
      height
      weight
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      moves: pokemon_v2_pokemonmoves {
        move: pokemon_v2_move {
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      pokemon_species: pokemon_v2_pokemonspecy {
        evolution_chain: pokemon_v2_evolutionchain {
          id
          species: pokemon_v2_pokemonspecies {
            name
          }
        }
      }
    }
  }
`;

interface Pokemon {
  name: string;
  id: number;
  evolutions: any;
}

const DisplayPokemon = () => {
  const { name } = useParams<{ name: string }>();
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading)
    return (
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Loading />
        </Grid>
      </Grid>
    );

  if (error)
    return (
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <NotFound />
        </Grid>
      </Grid>
    );

  /* console.log(data); */
  console.log(data.pokemon[0].pokemon_species.evolution_chain?.species.map((item: any) => item.name))

  return (
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
      <Grid item position="fixed" m={2}>
        <FloatingButton type="list" />
      </Grid>
      <Grid item xs={12} mt={9}>
        <ImgMediaCard
          name={data.pokemon[0].name}
          numPokedex={data.pokemon[0].id}
          abilities={data.pokemon[0].abilities}
          moves={data.pokemon[0].moves}
          types={data.pokemon[0].types}
          weight={data.pokemon[0].weight}
          height={data.pokemon[0].height}
          evolution={data.pokemon[0].pokemon_species.evolution_chain?.species.map((item: any) => item.name)}
        />
      </Grid>
      <Grid
        container
        px={2}
        sx={{
          position: "fixed",
          top: "50%",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <FloatingButton
            pokemon={data.pokemon[0].name}
            pokeId={data.pokemon[0].id}
            type="prev"
            disabled={data.pokemon[0].id == undefined}
          />
        </Grid>
        <Grid item>
          <FloatingButton
            pokemon={data.pokemon[0].name}
            pokeId={data.pokemon[0].id}
            type="next"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DisplayPokemon;
//--------------------------------------------------------------------------//

// interface Evoluciones {
//   name: string;
//   species: {
//     name: string
//   }
//   evolves_to: any
// }

// const Description = () => {
//   const {name} = useParams();

//   const [isLoading, setIsLoading] = useState(false);

//   const [pokemon, setPokemon] = useState<string>();
//   const [pokeId, setPokeId] = useState<number | undefined>();
//   const [pokeImage, setPokeImage] = useState<string>();
//   const [baseExp, setBaseExp] = useState<number>();
//   const [pokeAbilities, setPokeAbilities] = useState([]);
//   const [pokeTypes, setPokeTypes] = useState([]);
//   const [pokeMoves, setPokeMoves] = useState([]);

//   const [PokeSpeciesUrl, setPokeSpeciesUrl] = useState();

//   const [evolutionChainUrl, setEvolutionChainUrl] = useState([]);
//   const [initialForm, setInitialForm] = useState<Array<Evoluciones>>();
//   const [midForm, setMidForm] = useState<Array<Evoluciones>>([]);
//   const [finalForm, setFinalForm] = useState<Array<Evoluciones>>([]);

//   useEffect(() => {
//     setIsLoading(true);

//     getPokemonByName(name)
//       .then((res) => {
//         setPokemon(res.data.name);
//         setPokeId(res.data.id);
//         setBaseExp(res.data.base_experience);
//         setPokeImage(res.data.sprites.other['official-artwork'].front_default);
//         setPokeAbilities(res.data.abilities);
//         setPokeTypes(res.data.types);
//         setPokeMoves(res.data.moves);

//         setPokeSpeciesUrl(res.data.species.url);
//         /* console.log(res.data.species.url); */
//         let speciesId = res.data.species.url.split("/")[6];
//         /* console.log(speciesId) */

//         getChainIdById(parseInt(speciesId))
//           .then((res) => {
//             setEvolutionChainUrl(res.data.evolution_chain.url);
//             /* console.log(res.data.evolution_chain.url); */
//             let chainId = res.data.evolution_chain.url.split("/")[6];
//             /* console.log(chainId); */

//             getEvolutionChainById(parseInt(chainId))
//               .then((res) => {
//                 setInitialForm(res.data.chain.species.name);
//                 setMidForm(
//                   res.data.chain.evolves_to?.map((item: Evoluciones) => item.species.name)
//                 );
//                 setFinalForm(
//                   res.data.chain.evolves_to?.map((item: Evoluciones) =>
//                     item.evolves_to?.map((item: Evoluciones) => item.species.name)
//                   )
//                 );
//               });
//           })

//       })

//       .catch((error) => {
//         console.error(error);
//         setPokemon(undefined);
//       })

//       .finally(() => setIsLoading(false));

//   }, [name]);

//   return (
//     isLoading ? (
//       <Grid container>
//         <Grid item xs={12}>
//           <NavBar />
//         </Grid>
//         <Grid item xs={12}>
//           <Loading />
//         </Grid>
//       </Grid>
//     ) : (pokemon ? (
//       <Grid container>
//         <Grid item xs={12}
//           sx = {{
//             position: 'fixed',
//             width: '100%',
//           }}
//         >
//           <NavBar />
//         </Grid>
//         <Grid item
//           position='fixed'
//           m={2}
//         >
//               <FloatingButton type="list"/>
//           </Grid>
//         <Grid item xs={12}
//           mt = { 9 }
//         >
//           <ImgMediaCard
//             /* pokemon={pokemon} */
//             name={pokemon}
//             numPokedex={pokeId}
//             bexp={baseExp}
//             initialForm={initialForm}
//             midForm={midForm}
//             finalForm={finalForm}
//             image={pokeImage}
//             abilities={pokeAbilities}
//             moves={pokeMoves}
//             types={pokeTypes}
//             /* weight={pokemon.weight}
//             height={pokemon.height} */
//           />
//         </Grid>
//         <Grid container
//         px={
//           2
//         }
//           sx = {{
//               position: 'fixed',
//               top: '50%',
//               justifyContent: 'space-between',

//           }}
//         >
//           <Grid item>
//             <FloatingButton
//               pokemon = {pokemon}
//               pokeId = {pokeId}
//               type = "prev"
//               disabled = {pokeId == undefined}
//             />
//           </Grid>
//           <Grid item>
//             <FloatingButton
//               pokemon = {pokemon}
//               pokeId = {pokeId}
//               /* name={pokemon}  */
//               type="next"/>
//           </Grid>
//         </Grid>
//       </Grid>
//     ) : (
//       <Grid container>
//         <Grid item xs={12}>
//           <NavBar />
//         </Grid>
//         <Grid item xs={12}>
//           <NotFound />
//         </Grid>
//       </Grid>
//     ))
//   )

// };

// export default Description;
