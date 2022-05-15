import { useState, useEffect } from "react";
import PokemonService from "../services/pokemons";

const usePokemonFilter = () => {
  const [allPokemons, setAllPokemons] = useState({
    totalPokemonCount: null,
    pokemonsPerPage: [],
    filteredPokemons: [],
    types: [],
  });

  const [loading, setLoading] = useState(0);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedPokemonType, setSelectedPokemonType] = useState("All");

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async (limit = 0) => {
    const p1 = new PokemonService(limit);
    let pokemonTypes = await p1.getPokemonTypes();
    setLoading(50);
    let { results, count } = await p1.getAllPokemons();
    let itemsToShow = !limit ? 0 : limit - (limit - 20);
    let detailsList = results
      .map(async (item, idx, arr) => {
        let { data } = await p1.getPokemonDetails(item.url);
        return (arr[idx] = await data);
      })
      .slice(-itemsToShow);
    let resolvedList = await Promise.all([...detailsList]);
    setAllPokemons({
      ...allPokemons,
      pokemonsPerPage: resolvedList,
      pokemons: resolvedList,
      totalPokemonCount: count,
      types: pokemonTypes,
    });
    setLoading(100);
  };

  const extractTypes = (arr, result) => {
    let copy = [...arr];
    let copy2 = [...result];
    if (copy.length === 0) {
      return copy2;
    }
    let item = copy.pop();
    copy2.push(item.type.name);
    return extractTypes(copy, copy2);
  };

  const handleTypeChange = (e) => {
    setFilterLoading(true);
    setTimeout(() => {
      setSelectedPokemonType(e.target.value.toLowerCase());
      let arr = [...allPokemons.pokemonsPerPage];
      let filteredItems = arr.filter((item) => {
        let types = extractTypes(item.types, []);
        return types.includes(e.target.value.toLowerCase());
      });

      setAllPokemons({ ...allPokemons, filteredPokemons: filteredItems });
      setFilterLoading(false);
    }, 4000);
  };

  return {
    pokemonList:
      selectedPokemonType === "All"
        ? allPokemons.pokemonsPerPage
        : allPokemons.filteredPokemons,
    totalPokemonCount: allPokemons.totalPokemonCount,
    pokemonTypes: allPokemons.types,
    handleTypeChange,
    getPokemons,
    loading,
    filterLoading,
    setLoading,
  };
};

export default usePokemonFilter;
