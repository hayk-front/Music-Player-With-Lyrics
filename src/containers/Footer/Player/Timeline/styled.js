import styled from "styled-components";

export const Timeline = styled.div`
  position: relative;
  width: ${(props) => props.zoom * 100}%;
  height: 60px;
  margin: 4% auto 1%;
  text-align: center;
  border-radius: 7px;
  background: linear-gradient(#c7d6ef, #e0ebfe, #c7d6ef);
`;
