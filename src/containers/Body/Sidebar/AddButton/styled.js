import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 115px;
  width: 35%;
  padding: 2% 3%;
  border-radius: 20px;
  border: 1px solid #e7e7e7;
  font-weight: 600;
  font-family: monospace;
  background-color: #fff;
  box-shadow: 0 5px 8px hsl(0 0% 0% / 20%);
`;

export const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 3%;
  filter: invert(41%) sepia(0%) saturate(1519%) hue-rotate(341deg)
    brightness(100%) contrast(86%);
`;
