import styled from "styled-components";

export const GenericButton = styled.button`
  width: ${({ width }) => (width ? width : "100%")};
  padding: 15px 25px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#000")};
  color: #fff;
  margin: 15px auto;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 10px;
  box-shadow: 10px 10px 34px -15px rgba(0, 0, 0, 0.75);
`;
