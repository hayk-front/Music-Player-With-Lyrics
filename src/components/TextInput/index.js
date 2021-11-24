import React from "react";
import * as Styled from "./styled";

export const TextInput = React.memo((props) => {
  const { text, updateChunkLyrics } = props;

  return (
    <Styled.Label>
      <Styled.Input
        value={text}
        onChange={updateChunkLyrics}
        placeholder="Type lyrics here"
      ></Styled.Input>
    </Styled.Label>
  );
});
