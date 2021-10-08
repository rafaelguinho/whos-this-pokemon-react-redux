import styled from "styled-components";

const Life = styled.img`
  margin-right: 0.2em;
  &:last-child {
    margin-right: 0;
  }
`;

const LifePanel = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 155.75px;

  @media (max-width: 800px) {
    margin-top: 0.5em;
    width: auto;
  }
`;

export { LifePanel, Life };
