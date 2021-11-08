import styled from "styled-components";

export const Chunk = styled.div`
  position: absolute;
  z-index: 1;
  cursor: grab;
  left: ${(props) => props.left + "%"};
  min-width: 50px;
  width: ${(props) => props.width + "%"};
  height: 100%;
  margin: 0 0.3%;
  background-color: #b5bbf2;
`;


