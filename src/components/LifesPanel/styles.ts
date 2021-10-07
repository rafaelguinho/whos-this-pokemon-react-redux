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
  width: 144.75px;
`;

export { LifePanel, Life };
