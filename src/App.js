import { useState, useRef } from "react";
import GlobalStyles, { Container } from "./globalStyles";
import styled from "styled-components";
import Pokemon from "./Pokemon";
import Page from "./Page";
import Loader from "./Loader";
import { GenericButton } from "./GenericButton/GenericButton";
import { BsSearch } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import "./App.css";
import Modal from "./Modal";
import usePokemonFilter from "./Hooks/usePokemonFilter";
import Lottie from "lottie-react";
import PokeballAnimation from "./assests/img/96855-pokeball-loading-animation.json";

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
  padding: 35px;
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
    display: block;
    margin: 10px auto;
  }
`;

const NotFoundElement = styled.div`
  margin: 50px 20px;

  h3 {
    background: -webkit-linear-gradient(#4b6cb7, #182848);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HomeButton = styled.div`
  font-size: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00bfff;
  cursor: pointer;
  margin: 30px auto;
`;

function App() {
  const { pokemonList, handleTypeChange, handleSearchChange, ...options } =
    usePokemonFilter();
  const [toggleModal, setToggleModal] = useState(false);
  const selectElement = useRef();

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
              onChange={(e) => {
                handleTypeChange(e);
                selectElement.current.size = 1;
                selectElement.current.blur();
              }}
              ref={selectElement}
            >
              <option value="All" defaultChecked>
                All
              </option>
              {options.pokemonTypes.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                );
              })}
            </select>
          </ModalPokemonFilter>
          <ModalPokemonSearch>
            <h2>Search By Name</h2>
            <input
              type="text"
              placeholder="Pokemon Name"
              onChange={(e) => handleSearchChange(e)}
            />
            <GenericButton width="27%">Apply</GenericButton>
          </ModalPokemonSearch>
        </ModalWrapper>
      </>
    );
  };

  const renderPokemons = () => {
    return pokemonList.length
      ? pokemonList.map((pokemon, index) => {
          return (
            <Pokemon
              id={pokemon.id}
              name={pokemon.name}
              type={pokemon.types[0].type.name}
              image={pokemon.sprites.other.dream_world.front_default}
              key={index}
            />
          );
        })
      : null;
  };

  const resetFilter = () => {
    options.setSelectedPokemonType("All");
    options.setSearchField("");
    // options.getPokemons(JSON.parse(localStorage.getItem("Limit")));
  };

  const renderError = () => {
    return (options.selectPokemonType !== "All" &&
      !options.filteredPokemonsInPage.length) ||
      (options.selectSearchPokemon !== "" &&
        !options.searchPokemonInPage.length) ? (
      <NotFoundElement>
        <h3>
          {options.selectSearchPokemon !== ""
            ? `Oops! couldn't found anything related ${options.selectSearchPokemon}`
            : `Oops! couldn't found anything related ${options.selectPokemonType}`}
          , <br></br> Click the home button to get back to the main page .
        </h3>
        <HomeButton onClick={resetFilter}>
          <AiFillHome />
        </HomeButton>
      </NotFoundElement>
    ) : null;
  };

  return (
    <AppContainer>
      <Loader
        progress={options.loading}
        setProgress={options.setLoading}
        color="#4b6cb7"
      />
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
        {!options.filterLoading ? (
          renderPokemons()
        ) : (
          <Lottie
            animationData={PokeballAnimation}
            loop="true"
            style={{ height: "180px", width: "180px", marginTop: "50px" }}
          />
        )}
      </PokemonsContainer>
      {(options.selectPokemonType !== "All" &&
        options.filteredPokemonsInPage.length) ||
      (options.selectSearchPokemon !== "" &&
        options.searchPokemonInPage.length) ? (
        <HomeButton onClick={resetFilter}>
          <AiFillHome />
        </HomeButton>
      ) : (
        renderError()
      )}
      {/* {!options.filteredPokemonsInPage.length ||
      !options.searchPokemonInPage.length
        ? renderError()
        : null} */}
      <Page
        itemCount={options.totalPokemonCount}
        onChange={options.getPokemons}
      />
      <Modal isOpen={toggleModal} modalControl={setToggleModal}>
        {ModalContent}
      </Modal>
    </AppContainer>
  );
}

export default App;
