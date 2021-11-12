import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as Styled from "./styled";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getActiveChunkId,
  getLeftNeighbourChunk,
  getRightNeighbourChunk,
  getWidthInPixels,
} from "../../../../../redux/selectors";

import {
  setChunkEndTime,
  setChunkStartTime,
  setWidthInPixels,
  setActiveChunkId,
} from "../../../../../redux/actions/action";
import {
  calculatePercentBySecond,
  percentToPixel,
} from "../../../../../helpers";
import LeftEdge from "./LeftEdge";
import RightEdge from "./RightEdge";
import { useEventListener } from "../../../../../custom-hooks/useEventListener";
import {
  getChunkEdgeSeconds,
  getChunkStartEndPercents,
  isMovedUntilBarrier,
} from "./helper";

const AudioChunk = React.memo((props) => {
  const {
    audioChunk,
    timeline,
    audioDuration,
    setWidthInPixels,
    setChunkStartTime,
    setChunkEndTime,
    activeChunkId,
    setActiveChunkId,
    leftNeighbourChunk,
    rightNeighbourChunk,
  } = props;
  const chunk = useRef(null);
  const { start, end } = audioChunk;
  const startPercent = calculatePercentBySecond(start, audioDuration);
  const endPercent = calculatePercentBySecond(end, audioDuration);
  const [chunkSizeInPercent, setChunkSizeInPercent] = useState(
    endPercent - startPercent
  );
  const [isMovable, setIsMovable] = useState(false);
  const [prevChunkEnd, setPrevEnd] = useState(0);
  const [nextChunkStart, setNextStart] = useState(audioDuration);

  useEffect(() => {
    leftNeighbourChunk && setPrevEnd(leftNeighbourChunk.end);
    rightNeighbourChunk && setNextStart(rightNeighbourChunk.start);
  }, [activeChunkId, leftNeighbourChunk, rightNeighbourChunk]);

  useLayoutEffect(() => {
    setWidthInPixels(percentToPixel(chunk));
  }, [chunk, setWidthInPixels]);

  const movingChunk = (e) => {
    if (isMovable && chunk.current) {
      const movedSize = chunk.current.offsetLeft + e.movementX;
      const startEndPercents = getChunkStartEndPercents(
        movedSize,
        chunk.current,
        timeline.current
      );
      if (
        !isMovedUntilBarrier(
          startEndPercents.start,
          startEndPercents.end,
          prevChunkEnd,
          nextChunkStart,
          audioDuration
        )
      )
        chunk.current.style.left = `${startEndPercents.start}%`;
    }
  };

  const dragStart = (e) => {
    if (e.target !== chunk.current) return;
    setIsMovable(true);
    setActiveChunkId(audioChunk.id);
  };
  const dragMove = (e) => {
    e.preventDefault();
    movingChunk(e);
  };

  const dragFinish = () => {
    setIsMovable(false);
    const edgeSeconds = getChunkEdgeSeconds(
      chunk.current,
      timeline.current,
      audioDuration
    );
    console.log(edgeSeconds.startSecond, edgeSeconds.endSecond);
    setChunkStartTime(edgeSeconds.startSecond);
    setChunkEndTime(edgeSeconds.endSecond);
  };
  useEventListener("mousedown", (e) => dragStart(e), chunk.current);
  useEventListener("mousemove", (e) => {
    if (isMovable) dragMove(e);
  });
  useEventListener("mouseup", () => {
    if (isMovable) dragFinish();
  });

  return (
    <Styled.Chunk width={chunkSizeInPercent} left={startPercent} ref={chunk}>
      <LeftEdge
        audioChunk={audioChunk}
        chunkRef={chunk}
        timelineRef={timeline}
        left={startPercent}
        startPercent={startPercent}
        endPercent={endPercent}
        setChunkSizeInPercent={setChunkSizeInPercent}
      />
      <RightEdge
        audioChunk={audioChunk}
        chunkRef={chunk}
        timelineRef={timeline}
        startPercent={startPercent}
        endPercent={endPercent}
        setChunkSizeInPercent={setChunkSizeInPercent}
      />
    </Styled.Chunk>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  widthInPixels: getWidthInPixels(state),
  activeChunkId: getActiveChunkId(state),
  leftNeighbourChunk: getLeftNeighbourChunk(state),
  rightNeighbourChunk: getRightNeighbourChunk(state),
});

export default connect(mapStateToProps, {
  setWidthInPixels,
  setChunkStartTime,
  setChunkEndTime,
  setActiveChunkId,
})(AudioChunk);
