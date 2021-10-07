import styled from "styled-components";

const Button = styled.button`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  display: "inline-block";
  padding: 0.7em 2.4em;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  border: 1px solid #ffffff;
  font-size: 0.8em;
  font-weight: 300;
  color: #ffffff;
  background-color: #4834d4;
  box-shadow: inset 0 -0.6em 0 -0.35em rgba(0, 0, 0, 0.17);
  text-align: center;
  position: relative;
  outline: none;

  &:active {
    top: 0.1em;
  }

  &:hover {
    color: #ffffff;
    background-color: #40407a;
    cursor: pointer;
    transition: all 0.2s;
  }
`;

export default Button;
