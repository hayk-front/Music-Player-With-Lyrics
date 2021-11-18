import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getLeftNeighbourChunk,
} from "../../../../../../redux/selectors";
import {
  getChunkStartEndPercents,
  getWidth,
  isReachedLeftBarrier,
  setWidth,
} from "../helper";
import { calcPercent } from "../../../../../../helpers";
import Edge from "../Edge";

const LeftSide = React.memo((props) => {
  const {
    chunkRef,
    audioChunk,
    timelineRef,
    audioDuration,
    leftNeighbourChunk,
  } = props;
  const minWidth = 30;
  const [neighbourEnd, setNeighbourEnd] = useState(0);
  const timeline = timelineRef.current;
  const chunk = chunkRef.current;

  useEffect(() => {
    if (leftNeighbourChunk) {
      setNeighbourEnd(leftNeighbourChunk.end);
    }
  }, [leftNeighbourChunk]);

  const resizeToLeft = (e) => {
    const movedSize = chunk.offsetLeft + e.movementX;
    let newWidth = getWidth(chunk);
    const startEndPercents = getChunkStartEndPercents(
      movedSize,
      chunk,
      timeline
    );
    const barrierEnd = calcPercent(neighbourEnd, audioDuration);
    const mousePos = calcPercent(
      e.clientX - timeline.offsetLeft,
      getWidth(timeline)
    );
    if (!isReachedLeftBarrier(startEndPercents.start, barrierEnd, mousePos)) {
      newWidth -= e.movementX;
      if (newWidth > minWidth) {
        const leftInPercent = calcPercent(movedSize, getWidth(timeline));
        chunk.style.left = `${leftInPercent}%`;
      }
      const widthInPercent = calcPercent(newWidth, getWidth(timeline));
      setWidth(chunk, widthInPercent);
    }
  };

  return (
    <Edge
      resize={resizeToLeft}
      side={"left"}
      audioChunk={audioChunk}
      chunkRef={chunkRef}
      timelineRef={timelineRef}
    ></Edge>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  leftNeighbourChunk: getLeftNeighbourChunk(state),
});

export default connect(mapStateToProps)(LeftSide);
