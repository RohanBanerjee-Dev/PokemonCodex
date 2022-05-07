import { useEffect, useState } from "react";
import GlobalStyles, { Container } from "./globalStyles";
import styled from "styled-components";
import Pokemon from "./Pokemon";
import PokemonService from "./services/pokemons";
import Page from "./Page";
import Loader from "./Loader";

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
  margin: 1rem 0;
`;

function App() {
  const [allPokemons, setAllPokemons] = useState({
    totalPokemonCount: null,
    pokemons: [],
  });
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async (limit = 0) => {
    const p1 = new PokemonService(limit);
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
      pokemons: resolvedList,
      totalPokemonCount: count,
    });
    setLoading(100);
  };

  return (
    <AppContainer>
      <Loader progress={loading} setProgress={setLoading} color="#80f" />
      <GlobalStyles />
      <Title>Pokemon Codex</Title>
      <PokemonsContainer>
        {allPokemons.pokemons.length &&
          allPokemons.pokemons.map((pokemon, index) => {
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
      <Page itemCount={allPokemons.totalPokemonCount} onChange={getPokemons} />
    </AppContainer>
  );
}

export default App;
