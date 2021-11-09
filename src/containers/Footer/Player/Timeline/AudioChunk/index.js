import React, { useRef, useEffect, useState } from "react";
import * as Styled from "./styled";
import { connect } from "react-redux";
import { useEventListener } from "../../../../../custom-hooks/useEventListener";
import {
  getAudioDuration,
  getWidthInPixels,
} from "../../../../../redux/selectors";

import { setWidthInPixels } from "../../../../../redux/actions/action";
import {
  calculatePercentBySecond,
  percentToPixel,
} from "../../../../../helpers";
import LeftEdge from "./LeftEdge";
import RightEdge from "./RightEdge";

const AudioChunk = React.memo((props) => {
  const { audioChunk, timeline, audioDuration, setWidthInPixels } = props;
  const chunk = useRef(null);
  const { start, end } = audioChunk;
  const startPercent = calculatePercentBySecond(start, audioDuration);
  const endPercent = calculatePercentBySecond(end, audioDuration);
  const [chunkSizeInPercent, setChunkSizeInPercent] = useState(
    endPercent - startPercent
  );

  useEffect(() => {
    if (chunk) setWidthInPixels(percentToPixel(chunk));
  }, [chunk, setWidthInPixels]);

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
});
export default connect(mapStateToProps, {
  setWidthInPixels,
})(AudioChunk);


// TODO: drag
//   const [isMovable, setIsMovable] = useState(false);
//   const dragStart = () => {
//     setIsMovable(true);
//   };
// console.log('chunk: ', chunk);
//   const dragMove = (e) => {
//     if (isMovable && chunk.current) {
//       console.log("pl:", timeline.current.offsetLeft);
//       const Xsize = e.clientX - timeline.current.offsetLeft;
//       chunk.current.style.left = Xsize + "px";
//     }
//   };

//   const dragFinish = () => {
//     setIsMovable(false);
//     // TODO: set redux start and end
//   };
  // useEventListener("mousedown", dragStart);
  // useEventListener("mousemove", (e) => {
  //   if (isMovable) dragMove(e);
  // });
  // useEventListener("mouseup", () => {
  //   if (isMovable) dragFinish();
  // });
