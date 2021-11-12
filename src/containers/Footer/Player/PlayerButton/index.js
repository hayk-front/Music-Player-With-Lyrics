import React, { useState } from "react";
import * as Styled from "./styled";

export const PlayerButton = (props) => {
  const { audio } = props;
  const [paused, setPaused] = useState(true);

  const onPlayPause = () => {
    if(!audio) {
      return
    }
    if (paused) {
      audio.play();
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  };

  return (
    <Styled.Button
      onClick={onPlayPause}
      paused={paused}
    ></Styled.Button>
  );
};
