import React, { useRef, useState, useEffect } from "react";
import { useEventListener } from "../../../../../../custom-hooks/useEventListener";
import * as Styled from "./styled";
import {
  setChunkEndTime,
  setActiveChunkId,
} from "../../../../../../redux/actions/action";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getRightNeighbourChunk,
} from "../../../../../../redux/selectors";
import {
  getChunkEdgeSeconds,
  getChunkStartEndPercents,
  getWidth,
  isReachedToRightBarrier,
  setWidth,
} from "../helper";
import { pixelToPercent, secondToPercent } from "../../../../../../helpers";

const RightEdge = React.memo((props) => {
  const {
    chunkRef,
    audioChunk,
    timelineRef,
    audioDuration,
    setChunkEndTime,
    setActiveChunkId,
    rightNeighbourChunk,
  } = props;
  const minWidth = 40;
  const rightEdge = useRef(null);
  const [isResizable, setIsResizable] = useState(false);
  const [neighbourStart, setNeighbourStart] = useState(audioDuration);
  const chunk = chunkRef.current;
  const timeline = timelineRef.current;

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
      const startEndPercents = getChunkStartEndPercents(
        chunk.offsetLeft,
        chunk,
        timeline
      );
      console.log("moved: ", startEndPercents.end);
      if (getWidth(chunk) >= minWidth) {
        const barrierStart = secondToPercent(neighbourStart, audioDuration);
        if (
          !isReachedToRightBarrier(startEndPercents.end, barrierStart)
        ) {
          const widthInPercent = pixelToPercent(
            getWidth(chunk) + e.movementX,
            getWidth(timeline)
          );
          setWidth(chunk, widthInPercent);
        }
      }
    }
  };

  const resizeFinish = () => {
    setIsResizable(false);
    const edgeSeconds = getChunkEdgeSeconds(chunk, timeline, audioDuration);
    setChunkEndTime(edgeSeconds.endSecond);
  };

  useEventListener("mousedown", resizeStart, rightEdge.current);
  useEventListener("mousemove", (e) => {
    if (isResizable) resizeMove(e);
  });
  useEventListener("mouseup", () => {
    if (isResizable) resizeFinish();
  });

  return <Styled.Edge onMouseDown={resizeStart} ref={rightEdge}></Styled.Edge>;
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  rightNeighbourChunk: getRightNeighbourChunk(state),
});

export default connect(mapStateToProps, {
  setChunkEndTime,
  setActiveChunkId,
})(RightEdge);
