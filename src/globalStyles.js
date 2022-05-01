import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400&display=swap');

* {
    box-sizing: border-box ;
    margin: 0 ;
    padding:0 ;
    font-family:'Jost', sans-serif ;
}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 50px;

  @media screen and (max-width: 991px) {
    padding: 0 30px;
  }
`;

export default GlobalStyles;
