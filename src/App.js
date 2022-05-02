import { useEffect, useState } from "react";
import GlobalStyles, { Container } from "./globalStyles";
import styled from "styled-components";
import Pokemon from "./Pokemon";
import PokemonService from "./services/pokemons";
import { GenericButton } from "./GenericButton/GenericButton";

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 3rem 0.5rem;
`;

const PokemonsContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 1.3rem 0;
`;

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getAllPokemons = async () => {
    const p1 = new PokemonService(20);
    let p2 = await p1.getAllPokemons();
    p2.forEach(async (item, idx, arr) => {
      let { data } = await p1.getPokemonDetails(item.url);
      arr[idx] = data;
      setAllPokemons(arr);
    });

    console.log(p2);
  };

  return (
    <AppContainer>
      <GlobalStyles />
      <Title>Pokemon Codex</Title>
      <PokemonsContainer>
        {allPokemons.length &&
          allPokemons.map((pokemon, index) => {
            console.log(pokemon.types);
            return (
              <Pokemon
                id={pokemon.id}
                name={pokemon.name}
                type={pokemon.types[0].type.name}
                image={pokemon.sprites.other.dream_world.front_default}
                key={index}
              />
            );
          })}
      </PokemonsContainer>
      <GenericButton width={"20%"}>Load More</GenericButton>
    </AppContainer>
  );
}

export default App;
