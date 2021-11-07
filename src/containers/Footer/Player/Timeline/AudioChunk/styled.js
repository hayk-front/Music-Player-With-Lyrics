import styled from "styled-components";

export const Chunk = styled.div`
  position: relative;
  z-index: 1;
  cursor: grab;
  left: 100px;
  min-width: 50px;
  width: ${(props) => props.width + "%"}};
  height: 100%;
  margin: 0 0.3%;
  background-color: #b5bbf2;
`;


