import React from "react";
import * as Styled from "./styled";

export const TextInput = (props) => {
  const { text, updateText } = props;

  return (
    <Styled.Label>
      <Styled.Input value={text} onChange={updateText}></Styled.Input>
    </Styled.Label>
  );
};


