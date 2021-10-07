import styled from "styled-components";

const OptionList = styled.ul`
  background: transparent;
  margin: 0 1em;
  padding: 0.25em 1em;
  width: 200px;
`;

const OptionItem = styled.li`
  margin: .8em;
  padding: 0.1em 0;
  cursor: pointer;
  list-style: none;
border-radius: 2px;
  transition: 0.2s;

  

  &:hover {
    background-color: yellow;
    color: black;
  }

  &.highlighter{
    background-color: yellow;
    color: black;
    cursor:default
  }

  &.not-highlighter{
    background-color: initial;
    color: initial;
    opacity: .5;
  }

  &.not-highlighter:hover {
    cursor: not-allowed;
    opacity: .5;
  }
`;

export { OptionList, OptionItem };
