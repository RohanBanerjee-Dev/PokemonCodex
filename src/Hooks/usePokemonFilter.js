import { useState, useEffect } from "react";
import PokemonService from "../services/pokemons";

const usePokemonFilter = () => {
  const [allPokemons, setAllPokemons] = useState({
    totalPokemonCount: null,
    pokemonsPerPage: [],
    filteredPokemons: [],
    searchFilteredPokemons: [],
    types: [],
  });

  const [loading, setLoading] = useState(0);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedPokemonType, setSelectedPokemonType] = useState("All");
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async (limit = 0) => {
    localStorage.setItem("Limit", JSON.stringify(limit));
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

  const handleSearchChange = (searchValue) => {
    setFilterLoading(true);
    // setTimeout(() => {
    //   setSearchField(searchValue.toLowerCase());
    //   let arr = [...allPokemons.pokemonsPerPage];
    //   let filteredSearchItems = arr.filter((item) =>
    //     item.name.includes(searchField.toLowerCase())
    //   );
    //   setAllPokemons({
    //     ...allPokemons,
    //     searchFilteredPokemons: filteredSearchItems,
    //   });
    //   setFilterLoading(false);
    // }, 4000);
    setSearchField(searchValue.toLowerCase());
    let arr = [...allPokemons.pokemonsPerPage];
    let filteredSearchItems = arr.filter((item) =>
      item.name.includes(searchField)
    );
    setAllPokemons({
      ...allPokemons,
      searchFilteredPokemons: filteredSearchItems,
    });
    setFilterLoading(false);
  };

  return {
    pokemonList:
      selectedPokemonType === "All" && searchField === ""
        ? allPokemons.pokemonsPerPage
        : searchField !== ""
        ? allPokemons.searchFilteredPokemons
        : allPokemons.filteredPokemons,
    totalPokemonCount: allPokemons.totalPokemonCount,
    filteredPokemonsInPage: allPokemons.filteredPokemons,
    searchPokemonInPage: allPokemons.searchFilteredPokemons,
    NormalPokemonsInPage: allPokemons.pokemonsPerPage,
    pokemonTypes: allPokemons.types,
    selectPokemonType: selectedPokemonType,
    selectSearchPokemon: searchField,
    handleTypeChange,
    handleSearchChange,
    getPokemons,
    setSelectedPokemonType,
    setSearchField,
    setAllPokemons,
    loading,
    filterLoading,
    setLoading,
  };
};

export default usePokemonFilter;
