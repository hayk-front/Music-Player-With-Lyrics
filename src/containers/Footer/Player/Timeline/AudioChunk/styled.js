import styled from "styled-components";

export const Chunk = styled.div`
  position: absolute;
  cursor: grab;
  left: ${(props) => props.left + "%"};
  min-width: 40px;
  width: ${(props) => props.width + "%"};
  height: 100%;
  border-radius: 7px;
  background: linear-gradient(#A7ADDF, #b5bbf2, #A7ADDF);
`;


