import React from "react";
import * as Styled from "./styled";
import TextInput from "./TextInput";
import TimeInput from "./TimeInput";
import "./index.scss";

export const Subtitle = (props) => {
  const { audioChunk } = props;
  return (
    <Styled.Subtitle>
      <Styled.Icon src="./icons/remove.svg" alt="remove" />

      <TextInput initialText={audioChunk.textParams.text} />
      <div className="time-inputs-section">
        <TimeInput point="start" />
        <TimeInput point="end" />
      </div>
    </Styled.Subtitle>
  );
};
