import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { getAudioUrl } from "../../../redux/selectors";
import { PlayerButton } from "./PlayerButton";
import { ProgressBar } from "./ProgressBar";
import * as Styled from "./styled";
import Timeline from "./Timeline";

const Player = React.memo((props) => {
  const { audioUrl } = props;
  const audioElement = useRef(null);
  const [audioPlayer, setAudioElem] = useState(null);
  const [progressStatus, setProgressStatus] = useState(0);

  useEffect(() => {
    setAudioElem(audioElement.current);
  }, [audioElement, setAudioElem]);

  const updateProgressBar = () => {
    setProgressStatus((audioPlayer.currentTime / audioPlayer.duration) * 100);
  };

  return (
    <Styled.Player>
      <audio
        ref={audioElement}
        src={audioUrl}
        onTimeUpdate={updateProgressBar}
      ></audio>
      <div className="G-flex G-flex-column G-align-center">
        <PlayerButton audio={audioPlayer} />
        <ProgressBar audio={audioPlayer} progressStatus={progressStatus} />
        <Timeline />
      </div>
    </Styled.Player>
  );
});

const mapStateToProps = (state) => ({
  audioUrl: getAudioUrl(state),
});

export default connect(mapStateToProps)(Player);
