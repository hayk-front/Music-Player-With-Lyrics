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
  setChunkTimes,
  setWidthInPixels,
  setShowLyrics,
  setActiveChunkId,
} from "../../../../../redux/actions/action";
import { calcPercent } from "../../../../../helpers";
import { useEventListener } from "../../../../../custom-hooks/useEventListener";
import {
  getChunkEdgeSeconds,
  getChunkStartEndPercents,
  getWidth,
  isMovedToBarrier,
} from "./helper";
import ChunkEdge from "./ChunkEdge";

const AudioChunk = React.memo((props) => {
  const {
    audioChunk,
    timeline,
    audioDuration,
    setWidthInPixels,
    setChunkTimes,
    activeChunkId,
    setActiveChunkId,
    leftNeighbourChunk,
    rightNeighbourChunk,
  } = props;
  const chunkRef = useRef(null);
  const { start, end } = audioChunk;
  const startPercent = calcPercent(start, audioDuration);
  const endPercent = calcPercent(end, audioDuration);
  const [chunkSizeInPercent, setChunkSizeInPercent] = useState(
    endPercent - startPercent
  );
  const [isMovable, setIsMovable] = useState(false);
  const [prevChunkEnd, setPrevEnd] = useState(0);
  const [nextChunkStart, setNextStart] = useState(audioDuration);
  const chunk = chunkRef.current;

  useEffect(() => {
    leftNeighbourChunk && setPrevEnd(leftNeighbourChunk.end);
    rightNeighbourChunk && setNextStart(rightNeighbourChunk.start);
  }, [activeChunkId, leftNeighbourChunk, rightNeighbourChunk]);

  useLayoutEffect(() => {
    if (chunk) setWidthInPixels(getWidth(chunk));
  }, [chunk, setWidthInPixels]);

  const movingChunk = (e) => {
    if (isMovable && chunk) {
      const movedSize = chunk.offsetLeft + e.movementX;
      const startEndPercents = getChunkStartEndPercents(
        movedSize,
        chunk,
        timeline.current
      );
      if (
        !isMovedToBarrier(
          startEndPercents.start,
          startEndPercents.end,
          prevChunkEnd,
          nextChunkStart,
          audioDuration,
          null
        )
      )
        chunk.style.left = `${startEndPercents.start}%`;
    }
  };

  const dragStart = (e) => {
    if (e.target !== chunk) return;
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
      chunk,
      timeline.current,
      audioDuration
    );
    setChunkTimes({
      start: edgeSeconds.startSecond,
      end: edgeSeconds.endSecond,
    });
  };
  useEventListener("mousedown", (e) => dragStart(e), chunk);
  useEventListener("mousemove", (e) => {
    if (isMovable) dragMove(e);
  });
  useEventListener("mouseup", () => {
    if (isMovable) dragFinish();
  });

  return (
    <Styled.Chunk width={chunkSizeInPercent} left={startPercent} ref={chunkRef}>
      <ChunkEdge
        audioChunk={audioChunk}
        chunkRef={chunkRef}
        timelineRef={timeline}
        side="left"
        startPercent={startPercent}
        endPercent={endPercent}
        setChunkSizeInPercent={setChunkSizeInPercent}
      />
      <ChunkEdge
        audioChunk={audioChunk}
        chunkRef={chunkRef}
        timelineRef={timeline}
        side="right"
        startPercent={startPercent}
        endPercent={endPercent}
        setChunkSizeInPercent={setChunkSizeInPercent}
      />
      {/* <LeftEdge
        audioChunk={audioChunk}
        chunkRef={chunkRef}
        timelineRef={timeline}
        left={startPercent}
        startPercent={startPercent}
        endPercent={endPercent}
        setChunkSizeInPercent={setChunkSizeInPercent}
      />
      <RightEdge
        audioChunk={audioChunk}
        chunkRef={chunkRef}
        timelineRef={timeline}
        startPercent={startPercent}
        endPercent={endPercent}
        setChunkSizeInPercent={setChunkSizeInPercent}
      /> */}
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
  setChunkTimes,
  setActiveChunkId,
  setShowLyrics,
})(AudioChunk);
