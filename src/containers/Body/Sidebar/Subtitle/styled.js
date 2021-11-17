import styled from "styled-components";

export const Subtitle = styled.div`
  position: relative;
  min-width: 285px;
  width: 96%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 5%;
  padding: 7% 2% 3%;
  border-radius: 10px;
  font-weight: 600;
  font-family: monospace;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  box-shadow: 0 5px 8px hsl(0 0% 0% / 20%);
`;

export const Icon = styled.img`
  position: absolute;
  cursor: pointer;
  top: 8%;
  right: 4%;
  width: 18px;
  height: 18px;
  filter: invert(70%) sepia(2%) saturate(9%) hue-rotate(334deg) brightness(94%)
    contrast(93%);
`;

export const TimeInputSection = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
