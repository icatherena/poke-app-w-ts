import BASEURL from "./baseUrl"

const getPokemons = (page: number) => BASEURL.get(`/pokemon/?offset=${(page-1)*20}&limit=${20}`)

const getPokemones = (page: number) => BASEURL.get(`/pokemon/?offset=${(page-1)*12}&limit=${12}`)

const getPokemonByName = async (name: string | undefined) => await BASEURL.get(`/pokemon/${name}`)

const getPokemonByNamei = (name: string | undefined) => BASEURL.get(`/pokemon/${name}`)

const getChainIdById = (speciesId: number) => BASEURL.get(`/pokemon-species/${speciesId}`)

const getEvolutionChainById = (chainId: number) => BASEURL.get(`/evolution-chain/${chainId}`)


export {
    getPokemons,
    getPokemones,
    getPokemonByName,
    getPokemonByNamei,
    getChainIdById,
    getEvolutionChainById
}
