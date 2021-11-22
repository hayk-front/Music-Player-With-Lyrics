import styled from "styled-components";

export const Zoom = styled.div`
  width: 7%;
  margin-right: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Icon = styled.div`
  width: 22px;
  height: 22px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("./icons/zoom${(props) => props.zoomType}.svg");
`;

export const Span = styled.span`
  font-weight: 600;
`;
