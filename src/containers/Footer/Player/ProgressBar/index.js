import React, { useRef, useEffect } from "react";
import { getElementWidthOnWindow } from "../../../../helpers";
import * as Styled from "./styled";

export const ProgressBar = (props) => {
  const { audio, progressStatus } = props;
  const progress = useRef(null);
  const progressBar = useRef(null);

  const calculateProgressPercent = (event) => {
    // rename 
    const Xcoordinate = event.clientX;
    const { elementStart, elementWidth } = getElementWidthOnWindow(
      progressBar.current,
      Xcoordinate
    );
    // helper
    const progressPercent = Math.abs(
      Math.round((elementStart / elementWidth) * 100)
    );
    setProgressBarPercent(progressPercent);
  };

  const setProgressBarPercent = (percent) => {
    // helper function
    // setZrt(progress, progressStatus)
    progress.current.style.width = percent + "%";
    setAudioCurrentTime(percent);
  };

  const setAudioCurrentTime = (percent) => {
    // TODO percentToSecond
    audio.currentTime = Math.round(
      (Math.floor(audio.duration) * percent) / 100
    );
  };

  useEffect(() => {
    // TODO rename
    // setZrt(progress, progressStatus)
    progress.current.style.width = `${progressStatus}%`;
  }, [progress, progressStatus]);

  return (
    <Styled.ProgressBar
      ref={progressBar}
      onMouseDown={calculateProgressPercent}
    >
      <Styled.ProgressStatus ref={progress} />
    </Styled.ProgressBar>
  );
};
