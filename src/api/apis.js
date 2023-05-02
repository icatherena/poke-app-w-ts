import BASEURL from "./baseUrl"

const getPokemons = (page) => BASEURL.get(`/pokemon/?offset=${(page-1)*20}&limit=${20}`)

const getPokemones = (page) => BASEURL.get(`/pokemon/?offset=${(page-1)*12}&limit=${12}`)

const getPokemonById = (name) => BASEURL.get(`/pokemon/${name}`)

const getChainIdById = (speciesId) => BASEURL.get(`/pokemon-species/${speciesId}`)

const getEvolutionChainById = (chainId) => BASEURL.get(`/evolution-chain/${chainId}`)


export {
    getPokemons,
    getPokemones,
    getPokemonById,
    getChainIdById,
    getEvolutionChainById
}
