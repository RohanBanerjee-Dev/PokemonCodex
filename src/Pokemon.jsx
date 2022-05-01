import React, { useEffect, useState } from "react";
import PokemonService from "./services/pokemons";

const Pokemon = () => {
  useEffect(() => {
    getAllPokemons();
  }, []);

  const getAllPokemons = async () => {
    const p1 = new PokemonService(20);
    let p2 = await p1.getAllPokemons();
    p2.forEach(async (item, idx, arr) => {
      let { data } = await p1.getPokemonDetails(item.url);
      arr[idx] = data;
    });
    console.log(p2);
  };

  return <></>;
};

export default Pokemon;
