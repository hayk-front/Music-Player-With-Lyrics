import React, { useRef, useState, useEffect } from "react";
import { useEventListener } from "../../../../../../custom-hooks/useEventListener";
import * as Styled from "./styled";
import {
  setChunkStartTime,
  setActiveChunkId,
} from "../../../../../../redux/actions/action";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getLeftNeighbourChunk,
} from "../../../../../../redux/selectors";
import {
  getChunkEdgeSeconds,
  getChunkStartEndPercents,
  getWidth,
  isReachedLeftBarrier,
  setWidth,
} from "../helper";
import { pixelToPercent, secondToPercent } from "../../../../../../helpers";

const LeftEdge = React.memo((props) => {
  const {
    audioChunk,
    chunkRef,
    timelineRef,
    audioDuration,
    setChunkStartTime,
    setActiveChunkId,
    leftNeighbourChunk,
  } = props;
  const minWidth = 40;
  const leftEdge = useRef(null);
  const [isResizable, setIsResizable] = useState(false);
  const [neighbourEnd, setNeighbourEnd] = useState(0);
  const timeline = timelineRef.current;
  const chunk = chunkRef.current;
  useEffect(() => {
    if (leftNeighbourChunk) {
      setNeighbourEnd(leftNeighbourChunk.end);
    }
  }, [leftNeighbourChunk]);

  const resizeToLeft = (e) => {
    const mouseMoveSize = e.clientX - timeline.offsetLeft;
    let newWidth = getWidth(chunk);
    const startEndPercents = getChunkStartEndPercents(
      mouseMoveSize,
      chunk,
      timeline
    );
    const barrierEnd = secondToPercent(neighbourEnd, audioDuration);
    if (!isReachedLeftBarrier(startEndPercents.start, barrierEnd)) {
      newWidth -= e.movementX;
      if (newWidth > minWidth) {
        const leftInPercent = pixelToPercent(mouseMoveSize, getWidth(timeline));
        chunk.style.left = `${leftInPercent}%`;
      }
      const widthInPercent = pixelToPercent(newWidth, getWidth(timeline));
      setWidth(chunk, widthInPercent);
    }
  };

  const resizeStart = () => {
    setActiveChunkId(audioChunk.id);
    setIsResizable(true);
  };

  const resizeMove = (e) => {
    if (isResizable) {
      if (getWidth(chunk) < minWidth) {
        chunk.style.width = minWidth;
      } else {
        resizeToLeft(e);
      }
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
    const edgeSeconds = getChunkEdgeSeconds(chunk, timeline, audioDuration);
    setChunkStartTime(edgeSeconds.startSecond);
  };

  useEventListener("mousedown", resizeStart, leftEdge.current);
  useEventListener("mousemove", (e) => {
    if (isResizable) resizeMove(e);
  });
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return <Styled.Edge onMouseDown={resizeStart} ref={leftEdge}></Styled.Edge>;
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  leftNeighbourChunk: getLeftNeighbourChunk(state),
});

export default connect(mapStateToProps, {
  setChunkStartTime,
  setActiveChunkId,
})(LeftEdge);
