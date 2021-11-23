import React, { useRef, useState } from "react";
import { useEventListener } from "../../../../../../custom-hooks";
import * as Styled from "./styled";
import {
  setChunkTimes,
  setActiveChunkId,
} from "../../../../../../redux/actions/action";
import { connect } from "react-redux";
import { getAudioDuration } from "../../../../../../redux/selectors";
import { getChunkEdgeSeconds } from "../helper";

const Edge = React.memo((props) => {
  const {
    side,
    resize,
    audioChunk,
    chunkRef,
    timelineRef,
    duration,
    setChunkTimes,
    setActiveChunkId,
  } = props;
  const sideEdge = useRef(null);
  const [isResizable, setIsResizable] = useState(false);
  const timeline = timelineRef.current;
  const chunk = chunkRef.current;

  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      resize(e);
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
    const edgeSeconds = getChunkEdgeSeconds(chunk, timeline, duration);
    setChunkTimes({
      start: edgeSeconds.startSecond,
      end: edgeSeconds.endSecond,
    });
  };

  useEventListener("mousedown", resizeStart, sideEdge.current);
  useEventListener("mousemove", (e) => {
    if (isResizable) resizeMove(e);
  });
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return (
    <Styled.Edge
      onMouseDown={resizeStart}
      ref={sideEdge}
      side={side}
    ></Styled.Edge>
  );
});

const mapStateToProps = (state) => ({
  duration: getAudioDuration(state),
});

export default connect(mapStateToProps, {
  setChunkTimes,
  setActiveChunkId,
})(Edge);