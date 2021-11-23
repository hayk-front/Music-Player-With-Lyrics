import React, { useContext, useRef } from "react";
import { connect } from "react-redux";
import { TimelineContext } from "../../../../context/TimelineContext";
import { getAudioChunks } from "../../../../redux/selectors";
import AudioChunk from "./AudioChunk";
import * as Styled from "./styled";
import TimeTicks from "./TimeTicks";

const Timeline = React.memo((props) => {
  const { audioChunks, progressPercent } = props;
  const {zoom} = useContext(TimelineContext)
  const timeline = useRef(null);
  return (
    <Styled.Timeline ref={timeline} zoom={zoom}>
      <TimeTicks />
      {audioChunks.map((audioChunk) => {
        return (
          <AudioChunk
            progressPercent={progressPercent}
            audioChunk={audioChunk}
            timeline={timeline}
            key={audioChunk.id}
          />
        );
      })}
    </Styled.Timeline>
  );
});

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
});

export default connect(mapStateToProps)(Timeline);
