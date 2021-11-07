import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getActiveChunkEndPoint,
  getActiveChunkStartPoint,
} from "../../../../../redux/selectors";
import {
  setActiveChunkEndPoint,
  setActiveChunkStartPoint,
} from "../../../../../redux/actions/action";

import * as Styled from "./styled";

const TimeInput = (props) => {
  const { point, start, end } = props;
  const [timer, setTimer] = useState(null);
  const [timeInput, setTimeInput] = useState();

  // TODO: get start end seconds, parse to MIN:SEC, and give to timeInput

  const updateTime = (e) => {
    setTimeInput(e.target.value);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (point === "start") {
          setActiveChunkStartPoint(e.target.value);
        } else {
          setActiveChunkEndPoint(e.target.value);
        }
      }, 1500)
    );
  };

  return (
    <Styled.TimeSection>
      <Styled.Span>{point}</Styled.Span>
      <label>
        <Styled.Input type="time" onChange={updateTime} value={timeInput} />
      </label>
    </Styled.TimeSection>
  );
};

const mapStateToProps = (state) => ({
  start: getActiveChunkStartPoint(state),
  end: getActiveChunkEndPoint(state),
});

export default connect(mapStateToProps, {
  setActiveChunkStartPoint,
  setActiveChunkEndPoint,
})(TimeInput);
