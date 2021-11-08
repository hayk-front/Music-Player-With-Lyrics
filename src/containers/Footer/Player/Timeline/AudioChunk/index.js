import React, { useRef, useEffect } from "react";
import * as Styled from "./styled";
import { connect } from "react-redux";
import Edge from "./Edge";
import {
  getAudioDuration,
  getWidthInPercent,
} from "../../../../../redux/selectors";

import {
  setWidthInPercent,
  setActiveChunkRef,
} from "../../../../../redux/actions/action";
import { calculatePercentBySecond } from "../../../../../helpers";

const AudioChunk = React.memo((props) => {
  const {
    audioChunk,
    audioDuration,
    widthInPercent,
    setWidthInPercent,
    setActiveChunkRef,
  } = props;
  const chunk = useRef(null);
  const { start, end } = audioChunk;
  const startPercent = calculatePercentBySecond(start, audioDuration);
  const endPercent = calculatePercentBySecond(end, audioDuration);

  const setInitialChunkWidth = () => {
    setWidthInPercent(endPercent - startPercent);
  };

  useEffect(() => {
    setInitialChunkWidth();
  }, []);

  useEffect(() => {
    if (chunk && chunk.current) setActiveChunkRef(chunk);
  }, [chunk, setActiveChunkRef]);

  return (
    <Styled.Chunk width={widthInPercent} left={startPercent} ref={chunk}>
      <Edge side={"left"} startPercent={startPercent} endPercent={endPercent} />
      <Edge
        audioChunk={audioChunk}
        side={"right"}
        startPercent={startPercent}
        endPercent={endPercent}
      />
    </Styled.Chunk>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  widthInPercent: getWidthInPercent(state),
});
export default connect(mapStateToProps, {
  setWidthInPercent,
  setActiveChunkRef,
})(AudioChunk);
