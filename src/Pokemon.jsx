import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 250px;
  width: 170px;
  margin: 0.5rem;
  background-color: ${({ type }) => (type ? type : "white")};
  border: 1px solid #e6e4e4;
  border-radius: 0.5rem;
  text-align: center;
  box-shadow: 10px 10px 17px -11px rgba(0, 0, 0, 0.75);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.4s all ease-in-out;
  }
`;

const PokemonID = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  margin: 3px 0;
`;

const ImageContainer = styled.img`
  height: 120px;
  width: 120px;
`;

const DetailWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Pokemon = ({ id, name, type, image }) => {
  return (
    <>
      <CardContainer className={type}>
        <PokemonID>
          <small>#{id}</small>
        </PokemonID>
        <ImageContainer src={image} />
        <DetailWrapper>
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </DetailWrapper>
      </CardContainer>
    </>
  );
};

export default Pokemon;
