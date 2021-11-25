import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAudioDuration,
  getRightBarrier,
} from "../../../../../../redux/selectors";
import {
  getChunkStartEndPercents,
  getWidth,
  isReachedToRightBarrier,
  setWidth,
} from "../helper";
import { calcPercent } from "../../../../../../helpers";
import Edge from "../Edge";

const RightEdge = React.memo((props) => {
  const {
    chunkRef,
    chunkID,
    timelineRef,
    audioDuration,
    rightBarrier,
  } = props;
  const minWidth = 30;
  const [neighbourStart, setNeighbourStart] = useState(audioDuration);
  const chunk = chunkRef.current;
  const timeline = timelineRef.current;

  useEffect(() => {
    if (rightBarrier) {
      setNeighbourStart(rightBarrier);
    }
  }, [rightBarrier]);

  const resizeToRight = (e) => {
    const mousePos = calcPercent(
      e.clientX - timeline.offsetLeft,
      getWidth(timeline)
    );
    const startEndPercents = getChunkStartEndPercents(
      chunk.offsetLeft + e.movementX,
      chunk,
      timeline
    );
    if (getWidth(chunk) >= minWidth) {
      const barrierStart = calcPercent(neighbourStart, audioDuration);
      if (
        !isReachedToRightBarrier(startEndPercents.end, barrierStart, mousePos)
      ) {
        const widthInPercent = calcPercent(
          getWidth(chunk) + e.movementX,
          getWidth(timeline)
        );
        setWidth(chunk, widthInPercent);
      }
    }
  };

  return (
    <Edge
      resize={resizeToRight}
      side={"right"}
      chunkID={chunkID}
      chunkRef={chunkRef}
      timelineRef={timelineRef}
    ></Edge>
  );
});

const mapStateToProps = (state) => ({
  audioDuration: getAudioDuration(state),
  rightBarrier: getRightBarrier(state),
});

export default connect(mapStateToProps)(RightEdge);
