import React from "react";
import * as Styled from "./styled";

export const TimeInput = React.memo((props) => {
  const { time, point, updateChunkTime } = props;

  return (
    <Styled.TimeSection>
      <Styled.Span>{point}</Styled.Span>
      <label>
        <Styled.Input type="time" onChange={updateChunkTime} value={time} />
      </label>
    </Styled.TimeSection>
  );
});
