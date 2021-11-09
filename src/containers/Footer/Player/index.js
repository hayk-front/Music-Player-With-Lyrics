import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { getAudioUrl } from "../../../redux/selectors";
import { PlayerButton } from "./PlayerButton";
import { ProgressBar } from "./ProgressBar";
import * as Styled from "./styled";
import Timeline from "./Timeline";

import {useRefHook} from '../../../custom-hooks'

const timeToPercent = (time, duration) => (time / duration) * 100

const Player = React.memo((props) => {
  const { audioUrl } = props;
  const [progressPercent, setProgressStatus] = useState(0);
  const audioElement = useRef(null);
  
  const {audioPlayer} = useRefHook(audioElement.current)

  const updateProgressBar = () => {
    const timePercent = timeToPercent(audioPlayer.currentTime, audioPlayer.duration)
    setProgressStatus(timePercent);
  };

  return (
    <Styled.Player>
      <audio
        ref={audioElement}
        src={audioUrl}
        onTimeUpdate={updateProgressBar}
      />
      <div className="G-flex G-flex-column G-align-center">
        <PlayerButton audio={audioPlayer} />
        <ProgressBar audio={audioPlayer} progressPercent={progressPercent} />
        <Timeline />
      </div>
    </Styled.Player>
  );
});

const mapStateToProps = (state) => ({
  audioUrl: getAudioUrl(state),
});

export default connect(mapStateToProps)(Player);
