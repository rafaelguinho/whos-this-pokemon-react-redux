import styled from "styled-components";

const OptionList = styled.ul`
  background: transparent;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: 200px;
`;

const OptionItem = styled.li`
  margin: 1em;
  padding: 0.1em 0;
  cursor: pointer;
  list-style: none;

  transition: 0.2s;

  &:hover {
    background-color: yellow;
    color: black;
  }
`;

export { OptionList, OptionItem };
