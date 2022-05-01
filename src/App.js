import GlobalStyles, { Container } from "./globalStyles";
import styled from "styled-components";
import Pokemon from "./Pokemon";

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Title>Pokemon Codex</Title>
      <PokemonsContainer>
        <Pokemon />
      </PokemonsContainer>
    </AppContainer>
  );
}

export default App;
