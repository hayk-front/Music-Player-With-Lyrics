import React, { useState } from "react";
import * as Styled from "./styled";

export const PlayerButton = (props) => {
  const { audio } = props;
  const [playing, setPlayerStatus] = useState(false);

  const isPlaying = () => {
    if(!playing){
        setPlayerStatus(true);
        audio.play()
    } else{
        setPlayerStatus(false)
        audio.pause()
    }
  };

  return (
    <Styled.Button
      onClick={() => isPlaying()}
      playing={playing}
    ></Styled.Button>
  );
};
