import axios from "axios";

class PokemonService {
  constructor(limit) {
    this.baseUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  }

  async getAllPokemons() {
    let pokemons = await axios.get(this.baseUrl);
    return pokemons.data.results;
  }

  async getPokemonDetails(url) {
    let pokemonDetail = await axios.get(url);
    return pokemonDetail;
  }
}

export default PokemonService;
