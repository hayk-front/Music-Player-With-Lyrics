import styled from "styled-components";

export const ProgressBar = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 12px;
  margin: 0 auto;
  border-radius: 5px;
  background: linear-gradient(#CBDAF3, #E0EBFE, #CBDAF3);
`;

export const ProgressPercent = styled.div`
  position: absolute;
  width: 30%;
  height: 12px;
  border-radius: 5px;
  box-shadow: 2px 0 3px -2px #3463A1;
  background: linear-gradient(#4B8EE9, #5095f4, #4B8EE9);
`;
