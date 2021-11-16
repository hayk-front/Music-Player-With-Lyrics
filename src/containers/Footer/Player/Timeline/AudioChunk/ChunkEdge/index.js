import React, { useRef, useState, useEffect } from "react";
import { useEventListener } from "../../../../../../custom-hooks/useEventListener";
import * as Styled from "./styled";
import {
  setChunkTimes,
  setActiveChunkId,
} from "../../../../../../redux/actions/action";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getLeftNeighbourChunk,
  getRightNeighbourChunk,
} from "../../../../../../redux/selectors";
import { getChunkEdgeSeconds } from "../helper";
import { resizeToLeft, resizeToRight } from "./helper";

const ChunkEdge = React.memo((props) => {
  const {
    side,
    audioChunk,
    chunkRef,
    timelineRef,
    duration,
    setChunkTimes,
    setActiveChunkId,
    leftNeighbourChunk,
    rightNeighbourChunk,
  } = props;
  const minWidth = 30;
  const sideEdge = useRef(null);
  const [isResizable, setIsResizable] = useState(false);
  const [neighbourEnd, setNeighbourEnd] = useState(0);
  const [neighbourStart, setNeighbourStart] = useState(duration);
  const timeline = timelineRef.current;
  const chunk = chunkRef.current;

  useEffect(() => {
    if (leftNeighbourChunk) {
      setNeighbourEnd(leftNeighbourChunk.end);
    }
    if (rightNeighbourChunk) {
      setNeighbourStart(rightNeighbourChunk.start);
    }
  }, [leftNeighbourChunk, rightNeighbourChunk]);

  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      if (side === "left") {
        resizeToLeft(e, neighbourEnd, minWidth, chunk, timeline, duration);
      } else {
        resizeToRight(e, neighbourStart, minWidth, chunk, timeline, duration);
      }
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
  leftNeighbourChunk: getLeftNeighbourChunk(state),
  rightNeighbourChunk: getRightNeighbourChunk(state),
});

export default connect(mapStateToProps, {
  setChunkTimes,
  setActiveChunkId,
})(ChunkEdge);
