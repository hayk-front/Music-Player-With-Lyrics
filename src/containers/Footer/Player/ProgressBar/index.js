import React, { useRef, useEffect } from "react";
import { getElementWidthOnWindow } from "../../../../helpers";
import * as Styled from "./styled";

export const ProgressBar = (props) => {
  const { audio, progressStatus } = props;
  const progress = useRef(null);
  const progressBar = useRef(null);

  const CalculateProgressPercent = (event) => {
    const Xcoordinate = event.clientX;
    const { elementStart, elementWidth } = getElementWidthOnWindow(
      progressBar.current,
      Xcoordinate
    );
    const progressPercent = Math.abs(
      Math.round((elementStart / elementWidth) * 100)
    );
    setProgressBarPercent(progressPercent);
  };

  const setProgressBarPercent = (percent) => {
    progress.current.style.width = percent + "%";
    setAudioCurrentTime(percent);
  };

  const setAudioCurrentTime = (percent) => {
    audio.currentTime = Math.round(
      (Math.floor(audio.duration) * percent) / 100
    );
  };

  useEffect(() => {
    progress.current.style.width = `${progressStatus}%`;
  }, [progress, progressStatus]);

  return (
    <Styled.ProgressBar
      ref={progressBar}
      onMouseDown={CalculateProgressPercent}
    >
      <Styled.ProgressStatus ref={progress} />
    </Styled.ProgressBar>
  );
};
