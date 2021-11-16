import React, { useState } from "react";
import { connect } from "react-redux";
import { getAudioElement } from "../../../../redux/selectors";
import * as Styled from "./styled";

const PlayerButton = (props) => {
  const { audio } = props;
  const [paused, setPaused] = useState(true);

  const onPlayPause = () => {
    if (!audio) {
      return;
    }
    if (paused) {
      audio.play();
      setPaused(false);
    } else {
      audio.pause();
      setPaused(true);
    }
  };

  return <Styled.Button onClick={onPlayPause} paused={paused}></Styled.Button>;
};

const mapStateToProps = (state) => ({
  audio: getAudioElement(state),
});
export default connect(mapStateToProps)(PlayerButton);
