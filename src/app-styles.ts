import styled from "styled-components";

const AppContainer = styled.div`
  text-align: center;
  background-color: #c0392b;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: calc(10px + 2vmin);
  color: white;
  padding: 0 1em;
`;

const ButtonBottomContainer = styled.div`
margin-bottom: 1em;
`;

const GameInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
    justify-content: center;
  }
`;

export { AppContainer, GameInfoBar, ButtonBottomContainer };
