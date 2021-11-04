import React, { useState } from "react";
import { Audio } from "./Audio";
import { PlayerButton } from "./PlayerButton";
import { ProgressBar } from "./ProgressBar";
import * as Styled from "./styled";

export const Player = () => {
  const [audio, setAudio] = useState(null);

  return (
    <Styled.Player>
      <Audio setAudio={setAudio} />
      <div className="G-flex G-flex-column G-align-center">
        <PlayerButton audio={audio} />
        <ProgressBar audio={audio} />
      </div>
    </Styled.Player>
  );
};
