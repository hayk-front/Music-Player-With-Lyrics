import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  calculateProgressPercent,
  getElementWidthOnWindow,
  percentToSecond,
} from "../../../../helpers";
import { getAudioElement } from "../../../../redux/selectors";
import { setProgressPercent } from "./helper";
import * as Styled from "./styled";

const ProgressBar = (props) => {
  const { audio, progressPercent } = props;
  const currProgressElem = useRef(null);
  const progressBarElem = useRef(null);

  const calculateProgress = (event) => {
    const clickedProgressCoordinate = event.clientX;
    const { elementStart, elementWidth } = getElementWidthOnWindow(
      progressBarElem.current,
      clickedProgressCoordinate
    );
    const progressPercent = calculateProgressPercent(
      elementStart,
      elementWidth
    );
    setProgressBarPercent(progressPercent);
  };

  const setProgressBarPercent = (percent) => {
    setProgressPercent(currProgressElem, percent);
    setAudioCurrentTime(percent);
  };

  const setAudioCurrentTime = (percent) => {
    audio.currentTime = percentToSecond(audio.duration, percent);
  };

  useEffect(() => {
    setProgressPercent(currProgressElem, progressPercent);
  }, [currProgressElem, progressPercent]);

  return (
    <Styled.ProgressBar ref={progressBarElem} onMouseDown={calculateProgress}>
      <Styled.ProgressPercent ref={currProgressElem} />
    </Styled.ProgressBar>
  );
};

const mapStateToProps = (state) => ({
  audio: getAudioElement(state),
});
export default connect(mapStateToProps)(ProgressBar);
