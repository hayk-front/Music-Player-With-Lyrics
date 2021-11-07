import styled from "styled-components";

export const Edge = styled.div`
  ${(props) => (props.side === "left" ? `left: 0;` : `right: 0`)};

  background-image: url(${(props) =>
    props.side === "left" ? "./icons/left.svg" : "./icons/right.svg"});
  position: absolute;
  cursor: ew-resize;
  width: 10px;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #7574e3;
`;
