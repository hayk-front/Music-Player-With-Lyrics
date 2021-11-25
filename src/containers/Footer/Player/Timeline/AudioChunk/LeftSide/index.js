import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getLeftBarrier,
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
  const { chunkRef, chunkID, timelineRef, audioDuration, leftBarrier } = props;
  const minWidth = 30;
  const [chunk, setChunk] = useState(null);
  const timeline = timelineRef.current;

  useEffect(() => {
    chunkRef.current && setChunk(chunkRef.current);
  }, [chunkRef]);

  const resizeToLeft = (e) => {
    const movedSize = chunk.offsetLeft + e.movementX;
    let newWidth = getWidth(chunk);
    const startEndPercents = getChunkStartEndPercents(
      movedSize,
      chunk,
      timeline
    );
    const barrierEnd = calcPercent(leftBarrier, audioDuration);
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
      chunkID={chunkID}
      chunkRef={chunkRef}
      timelineRef={timelineRef}
    ></Edge>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  leftBarrier: getLeftBarrier(state),
});

export default connect(mapStateToProps)(LeftSide);
