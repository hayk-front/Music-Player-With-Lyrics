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
import { resize } from "./helper";

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
  const sideEdge = useRef(null);
  const [isRight, setIsRight] = useState(false);
  const [neighbourEnd, setNeighbourEnd] = useState(0);
  const [isResizable, setIsResizable] = useState(false);
  const [neighbourPoint, setNeighbourPoint] = useState(null);
  const [neighbourStart, setNeighbourStart] = useState(duration);
  const timeline = timelineRef.current;
  const chunk = chunkRef.current;

  useEffect(() => {
    if (side === "left") {
      setIsRight(false);
      setNeighbourPoint(neighbourEnd);
    } else {
      setIsRight(true);
      setNeighbourPoint(neighbourStart);
    }
  }, [side, neighbourStart, neighbourEnd]);

  useEffect(() => {
    if (leftNeighbourChunk) {
      setNeighbourEnd(leftNeighbourChunk.end);
    }
  }, [leftNeighbourChunk]);

  useEffect(() => {
    if (rightNeighbourChunk) {
      setNeighbourStart(rightNeighbourChunk.start);
    }
  }, [rightNeighbourChunk]);

  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      resize(e, neighbourPoint, chunk, timeline, duration, isRight);
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
