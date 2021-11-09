import React, { forwardRef, Fragment, useRef, useState } from "react";
import { connect } from "react-redux";
import { getAudioChunks } from "../../../../redux/selectors";
import AudioChunk from "./AudioChunk";
import * as Styled from "./styled";

const Timeline = React.memo((props) => {
  const { audioChunks } = props;
  const timeline = useRef(null);

  return (
    <Styled.Timeline ref={timeline}>
      {audioChunks.map((audioChunk) => {
        return (
          <AudioChunk audioChunk={audioChunk} timeline={timeline} key={audioChunk.id} />
        );
      })}
    </Styled.Timeline>
  );
});

const mapStateToProps = (state) => ({
  audioChunks: getAudioChunks(state),
});

export default connect(mapStateToProps)(Timeline);
