import React, { useState, useRef, useEffect } from "react";
import * as Styled from "./styled";

export const ProgressBar = (props) => {
  const { audio } = props;
  const progress = useRef(null);
  const progressBar = useRef(null);
  const [x, setX] = useState(0);
  const [progressPercent, setProgress] = useState(0);

  const calculateDistance = (event) => {
    setX(event.clientX);
  };

  const getProgressPercent = (elem, mouseX) => {
    const progressBarStart = mouseX - elem.offsetLeft;
    const progressBarWidth = window.innerWidth - 2 * elem.offsetLeft;
    return Math.abs(Math.round((progressBarStart / progressBarWidth) * 100));
  };

  useEffect(() => {
    setProgress(getProgressPercent(progressBar.current, x));
    progress.current.style.width = progressPercent + "%";
  }, [x, progress, progressPercent, getProgressPercent]);

  useEffect(() => {
    if (audio && audio.duration) {
      audio.currentTime = Math.round(
        (Math.floor(audio.duration) * progressPercent) / 100
      );
    }
  }, [audio, progressPercent]);

  return (
    <Styled.ProgressBar ref={progressBar} onMouseDown={calculateDistance}>
      <Styled.ProgressStatus ref={progress} />
    </Styled.ProgressBar>
  );
};
