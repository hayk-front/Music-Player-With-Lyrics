import styled from "styled-components";

export const Edge = styled.div`
  ${(props) => props.side}: 0;
  ${(props) => `border-top-${props.side}-radius`}: 7px;
  ${(props) => `border-bottom-${props.side}-radius`}: 7px;
  position: absolute;
  cursor: ew-resize;
  width: 12px;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: -2px 0 5px -2px #6867ab;
  background-color: #7574e3;
  background-image: url("./icons/${(props) => props.side}.svg");
`;