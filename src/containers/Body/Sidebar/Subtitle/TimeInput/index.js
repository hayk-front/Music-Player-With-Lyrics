import React from "react";
import * as Styled from "./styled";

export const TimeInput = (props) => {
  const { time, point, updateTime } = props;

  return (
    <Styled.TimeSection>
      <Styled.Span>{point}</Styled.Span>
      <label>
        <Styled.Input type="time" onChange={updateTime} value={time} />
      </label>
    </Styled.TimeSection>
  );
};
