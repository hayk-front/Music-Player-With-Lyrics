import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import * as Styled from "./styled";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getActiveChunkId,
  getLeftBarrier,
  getRightBarrier,
  getWidthInPixels,
} from "../../../../../redux/selectors";

import {
  setChunkTimes,
  setWidthInPixels,
  setShowLyrics,
  setActiveChunkId,
} from "../../../../../redux/actions/action";
import { calcPercent } from "../../../../../helpers";
import { useEventListener } from "../../../../../custom-hooks/";
import {
  getChunkEdgeSeconds,
  getChunkStartEndPercents,
  getWidth,
  isMovedToBarrier,
} from "./helper";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const AudioChunk = React.memo((props) => {
  const {
    id,
    start,
    end,
    timeline,
    audioDuration,
    setWidthInPixels,
    setChunkTimes,
    activeChunkId,
    setActiveChunkId,
    leftBarrier,
    rightBarrier,
  } = props;
  const chunkRef = useRef(null);
  const startPercent = calcPercent(start, audioDuration);
  const endPercent = calcPercent(end, audioDuration);
  const [chunkSizeInPercent] = useState(endPercent - startPercent);
  const [isMovable, setIsMovable] = useState(false);
  const [prevChunkEnd, setPrevEnd] = useState(0);
  const [nextChunkStart, setNextStart] = useState(audioDuration);
  const chunk = chunkRef.current;

  useEffect(() => {
    leftBarrier && setPrevEnd(leftBarrier);
    rightBarrier && setNextStart(rightBarrier);
  }, [activeChunkId, leftBarrier, rightBarrier]);

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
    setActiveChunkId(id);
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
      <LeftSide chunkID={id} chunkRef={chunkRef} timelineRef={timeline} />
      <RightSide chunkID={id} chunkRef={chunkRef} timelineRef={timeline} />
    </Styled.Chunk>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  widthInPixels: getWidthInPixels(state),
  activeChunkId: getActiveChunkId(state),
  leftBarrier: getLeftBarrier(state),
  rightBarrier: getRightBarrier(state),
});

export default connect(mapStateToProps, {
  setWidthInPixels,
  setChunkTimes,
  setActiveChunkId,
  setShowLyrics,
})(AudioChunk);
