import styled from "styled-components";

export const Button = styled.div`
  cursor: pointer;
  margin-bottom: 1%;
  width: 25px;
  height: 25px;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.playing ? `url("./icons/pause.svg")` : `url("./icons/play.svg")`};
`;
