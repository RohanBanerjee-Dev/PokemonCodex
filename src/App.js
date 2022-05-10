import { useEffect, useState, useRef } from "react";
import GlobalStyles, { Container } from "./globalStyles";
import styled from "styled-components";
import Pokemon from "./Pokemon";
import PokemonService from "./services/pokemons";
import Page from "./Page";
import Loader from "./Loader";
import { GenericButton } from "./GenericButton/GenericButton";
import { BsSearch } from "react-icons/bs";
import "./App.css";
import Modal from "./Modal";

const Title = styled.h1`
  text-align: center;
  background: -webkit-linear-gradient(#4b6cb7, #182848);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  height: 100%;
`;

const NavBar = styled.div`
  display: inline;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 320px;
`;

const SearchIcon = styled.span`
  margin-right: 10px;
  font-size: 17px;
`;

const ButtonTitle = styled.span`
  font-size: 17px;
`;

const PokemonsContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const ModalWrapper = styled.div`
  height: 350px;
  width: 600px;
  padding: 40px;
  text-align: center;
`;

const ModalPokemonFilter = styled.div`
  width: 100%;
  margin-bottom: 90px;
  position: relative;

  h2 {
    margin-bottom: 20px;
    letter-spacing: 1.4px;
    font-size: 22px;
  }

  select {
    width: 50%;
    font-size: 17px;
    text-align: center;
    border: 2px solid cyan;
    padding: 5px 0;
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    z-index: 2;
  }
`;

const ModalPokemonSearch = styled(ModalPokemonFilter)`
  input {
    width: 50%;
    font-size: 15px;
    border: 2px solid cyan;
    padding: 7px 10px;
  }
`;

function App() {
  const [allPokemons, setAllPokemons] = useState({
    totalPokemonCount: null,
    pokemons: [],
    types: [],
  });
  const [loading, setLoading] = useState(0);
  const [toggleModal, setToggleModal] = useState(false);
  const selectElement = useRef();

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
      pokemons: resolvedList,
      totalPokemonCount: count,
      types: pokemonTypes,
    });
    setLoading(100);
  };

  const handleModalClick = () => {
    setToggleModal(!toggleModal);
  };

  const ModalContent = () => {
    return (
      <>
        <ModalWrapper>
          <ModalPokemonFilter>
            <h2>Filter By Type</h2>
            <select
              name="pokemon-type"
              onFocus={() => (selectElement.current.size = 5)}
              onBlur={() => (selectElement.current.size = 1)}
              onChange={() => {
                selectElement.current.size = 1;
                selectElement.current.blur();
              }}
              ref={selectElement}
            >
              <option value="All" defaultChecked>
                All
              </option>
              {allPokemons.types.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                );
              })}
              {/* <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Bug">Bug</option> */}
            </select>
          </ModalPokemonFilter>
          <ModalPokemonSearch>
            <h2>Search By Name</h2>
            <input type="text" placeholder="Pokemon Name" />
          </ModalPokemonSearch>
        </ModalWrapper>
      </>
    );
  };

  return (
    <AppContainer>
      <Loader progress={loading} setProgress={setLoading} color="#4b6cb7" />
      <GlobalStyles />
      <NavBar>
        <Title>Pokemon Codex</Title>
        <GenericButton onClick={handleModalClick}>
          <SearchIcon>
            <BsSearch />
          </SearchIcon>
          <ButtonTitle>Advance Search</ButtonTitle>
        </GenericButton>
      </NavBar>
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
      <Modal isOpen={toggleModal} modalControl={setToggleModal}>
        {ModalContent}
      </Modal>
    </AppContainer>
  );
}

export default App;
